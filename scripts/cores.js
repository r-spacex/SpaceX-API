#!/usr/bin/env node

/**
 * This script updates core missions, reuse, landing counts, and status
 */

const MongoClient = require('mongodb');
const cheerio = require('cheerio');
const request = require('request-promise-native');

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const col = client.db('spacex-api').collection('core');
  const launch = client.db('spacex-api').collection('launch');

  // Update status of each core from the subreddit core tracking page
  // Parses two tables: One for active cores, and one for the status unknown cores, may
  // add support for the inactive and lost cores at some point
  const result = await request('https://www.reddit.com/r/spacex/wiki/cores');
  const $ = cheerio.load(result);

  const active = $('div.md:nth-child(2) > table:nth-child(14) > tbody:nth-child(2)').text();
  const active_row = active.split('\n').filter(v => v !== '');
  const active_cores = active_row.filter((value, index) => index % 7 === 0);
  const active_status = active_row.filter((value, index) => (index + 1) % 7 === 0);

  const unknown = $('div.md:nth-child(2) > table:nth-child(17) > tbody:nth-child(2)').text();
  const unknown_row = unknown.split('\n').filter(v => v !== '');
  const unknown_cores = unknown_row.filter((value, index) => index % 6 === 0);
  const unknown_status = unknown_row.filter((value, index) => (index + 1) % 6 === 0).map(x => x.replace(/\[source\]/gi, ''));

  const inactive = $('div.md:nth-child(2) > table:nth-child(20) > tbody:nth-child(2)').text();
  const inactive_row = inactive.split('\n').filter(v => v !== '');
  const inactive_cores = inactive_row.filter((value, index) => index % 7 === 0);
  const inactive_status = inactive_row.filter((value, index) => (index + 1) % 7 === 0).map(x => x.replace(/\[source\]/gi, ''));

  const lost = $('div.md:nth-child(2) > table:nth-child(24) > tbody:nth-child(2)').text();
  const lost_row = lost.split('\n').filter(v => v !== '');
  const lost_cores = lost_row.filter((value, index) => index % 8 === 0);
  const lost_status = lost_row.filter((value, index) => (index + 1) % 8 === 0).map(x => x.replace(/\[source\]/gi, ''));

  // Update status and details for all active cores
  for await (const [index, core_serial] of active_cores.entries()) {
    console.log(core_serial);
    console.log(active_status[index]);
    await col.updateOne({ core_serial }, { $set: { details: active_status[index], status: 'active' } });
  }

  // Update status and details for all unknown cores
  for await (const [index, core_serial] of unknown_cores.entries()) {
    console.log(core_serial);
    console.log(unknown_status[index]);
    await col.updateOne({ core_serial }, { $set: { details: unknown_status[index], status: 'unknown' } });
  }

  // Update status and details for all inactive cores
  for await (const [index, core_serial] of inactive_cores.entries()) {
    console.log(core_serial);
    console.log(inactive_status[index]);
    await col.updateOne({ core_serial }, { $set: { details: inactive_status[index], status: 'inactive' } });
  }

  // Update status and details for all lost/expended cores
  for await (const [index, core_serial] of lost_cores.entries()) {
    console.log(core_serial);
    console.log(lost_status[index]);
    await col.updateOne({ core_serial }, { $set: { details: lost_status[index], status: 'lost' } });
  }

  // Create cores array to loop through for reuse counts
  const cores = [];
  const data = await col.find({}).sort({ core_serial: 1 }).toArray();
  data.forEach(core => {
    cores.push(core.core_serial);
  });

  // Begin reuse count updates
  for await (const core of cores) {
    const rtls_attempts = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'RTLS', landing_intent: true,
        },
      },
      launch_success: true,
    });
    const rtls_successes = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'RTLS', landing_intent: true, land_success: true,
        },
      },
      launch_success: true,
    });
    const asds_attempts = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'ASDS', landing_intent: true,
        },
      },
      launch_success: true,
    });
    const asds_successes = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'ASDS', landing_intent: true, land_success: true,
        },
      },
      launch_success: true,
    });

    const missions = [];
    const launch_results = await launch.find({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core,
        },
      },
    }).project({
      _id: 0,
      flight_number: 1,
      mission_name: 1,
    }).sort({
      flight_number: 1,
    }).toArray();

    launch_results.forEach(i => {
      const mission = {
        name: i.mission_name,
        flight: i.flight_number,
      };
      missions.push(mission);
    });

    let reuse_count;
    if (missions.length - 1 < 0) {
      reuse_count = 0;
    } else {
      reuse_count = missions.length - 1;
    }

    console.log(core);
    console.log(missions);
    console.log(`Reuse Count: ${reuse_count}`);
    console.log(`RTLS Attempts: ${rtls_attempts}`);
    console.log(`RTLS Successes: ${rtls_successes}`);
    console.log(`ASDS Attempts: ${asds_attempts}`);
    console.log(`ASDS Successes: ${asds_successes}\n`);

    await col.updateOne({ core_serial: core }, {
      $set: {
        reuse_count,
        rtls_attempts,
        rtls_landings: rtls_successes,
        asds_attempts,
        asds_landings: asds_successes,
        missions,
      },
    });
  }

  if (client) {
    client.close();
  }
})();
