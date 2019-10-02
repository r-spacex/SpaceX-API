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
  const result = await request('https://old.reddit.com/r/spacex/wiki/cores');
  const $ = cheerio.load(result);

  const active = $('div.md:nth-child(2) > table:nth-child(14) > tbody:nth-child(2)').text();
  const activeRow = active.split('\n').filter((v) => v !== '');
  const activeCores = activeRow.filter((value, index) => index % 7 === 0);
  const activeStatus = activeRow.filter((value, index) => (index + 1) % 7 === 0);

  const unknown = $('div.md:nth-child(2) > table:nth-child(17) > tbody:nth-child(2)').text();
  const unknownRow = unknown.split('\n').filter((v) => v !== '');
  const unknownCores = unknownRow.filter((value, index) => index % 6 === 0);
  const unknownStatus = unknownRow.filter((value, index) => (index + 1) % 6 === 0).map((x) => x.replace(/\[source\]/gi, ''));

  const inactive = $('div.md:nth-child(2) > table:nth-child(20) > tbody:nth-child(2)').text();
  const inactiveRow = inactive.split('\n').filter((v) => v !== '');
  const inactiveCores = inactiveRow.filter((value, index) => index % 7 === 0);
  const inactiveStatus = inactiveRow.filter((value, index) => (index + 1) % 7 === 0).map((x) => x.replace(/\[source\]/gi, ''));

  const lost = $('div.md:nth-child(2) > table:nth-child(24) > tbody:nth-child(2)').text();
  const lostRow = lost.split('\n').filter((v) => v !== '');
  const lostCores = lostRow.filter((value, index) => index % 8 === 0);
  const lostStatus = lostRow.filter((value, index) => (index + 1) % 8 === 0).map((x) => x.replace(/\[source\]/gi, ''));

  // Update status and details for all active cores
  for await (const [index, coreSerial] of activeCores.entries()) {
    console.log(coreSerial);
    console.log(activeStatus[index]);
    await col.updateOne({ core_serial: coreSerial }, { $set: { details: activeStatus[index], status: 'active' } });
  }

  // Update status and details for all unknown cores
  for await (const [index, coreSerial] of unknownCores.entries()) {
    console.log(coreSerial);
    console.log(unknownStatus[index]);
    await col.updateOne({ core_serial: coreSerial }, { $set: { details: unknownStatus[index], status: 'unknown' } });
  }

  // Update status and details for all inactive cores
  for await (const [index, coreSerial] of inactiveCores.entries()) {
    console.log(coreSerial);
    console.log(inactiveStatus[index]);
    await col.updateOne({ core_serial: coreSerial }, { $set: { details: inactiveStatus[index], status: 'inactive' } });
  }

  // Update status and details for all lost/expended cores
  for await (const [index, coreSerial] of lostCores.entries()) {
    console.log(coreSerial);
    console.log(lostStatus[index]);
    await col.updateOne({ core_serial: coreSerial }, { $set: { details: lostStatus[index], status: 'lost' } });
  }

  // Create cores array to loop through for reuse counts
  const cores = [];
  const data = await col.find({}).sort({ core_serial: 1 }).toArray();
  data.forEach((core) => {
    cores.push(core.core_serial);
  });

  // Begin reuse count updates
  for await (const core of cores) {
    const rtlsAttempts = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'RTLS', landing_intent: true,
        },
      },
      launch_success: true,
    });
    const rtlsSuccesses = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'RTLS', landing_intent: true, land_success: true,
        },
      },
      launch_success: true,
    });
    const asdsAttempts = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'ASDS', landing_intent: true,
        },
      },
      launch_success: true,
    });
    const asdsSuccesses = await launch.countDocuments({
      upcoming: false,
      'rocket.first_stage.cores': {
        $elemMatch: {
          core_serial: core, landing_type: 'ASDS', landing_intent: true, land_success: true,
        },
      },
      launch_success: true,
    });

    const missions = [];
    const launchResults = await launch.find({
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

    launchResults.forEach((i) => {
      const mission = {
        name: i.mission_name,
        flight: i.flight_number,
      };
      missions.push(mission);
    });

    let reuseCount;
    if (missions.length - 1 < 0) {
      reuseCount = 0;
    } else {
      reuseCount = missions.length - 1;
    }

    console.log(core);
    console.log(missions);
    console.log(`Reuse Count: ${reuseCount}`);
    console.log(`RTLS Attempts: ${rtlsAttempts}`);
    console.log(`RTLS Successes: ${rtlsSuccesses}`);
    console.log(`ASDS Attempts: ${asdsAttempts}`);
    console.log(`ASDS Successes: ${asdsSuccesses}\n`);

    await col.updateOne({ core_serial: core }, {
      $set: {
        reuse_count: reuseCount,
        rtls_attempts: rtlsAttempts,
        rtls_landings: rtlsSuccesses,
        asds_attempts: asdsAttempts,
        asds_landings: asdsSuccesses,
        missions,
      },
    });
  }

  if (client) {
    client.close();
  }
})();
