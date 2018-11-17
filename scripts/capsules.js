#!/usr/bin/env node

/**
 * This script updates capsule missions and landing counts
 */

const MongoClient = require('mongodb');

// Created so we can use async await with requests, and
// to use async sleep function inside the IIFE
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // Allow await for nested async functions
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const col = client.db('spacex-api').collection('capsule');
  const launch = client.db('spacex-api').collection('launch');

  const capsules = [];
  const data = await col.find({}).sort({ capsule_serial: 1 }).toArray();
  data.forEach(capsule => {
    capsules.push(capsule.capsule_serial);
  });


  const start = async () => {
    await asyncForEach(capsules, async capsule => {
      const landings = await launch.countDocuments({
        upcoming: false,
        'rocket.second_stage.payloads': {
          $elemMatch: {
            cap_serial: capsule,
            flight_time_sec: { $exists: true },
          },
        },
        launch_success: true,
      });

      const missions = [];
      const launch_results = await launch.find({
        upcoming: false,
        'rocket.second_stage.payloads': {
          $elemMatch: {
            cap_serial: capsule,
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

      console.log(capsule);
      console.log(missions);
      console.log(`Reuse Count: ${reuse_count}`);
      console.log(`Landings: ${landings}`);

      await col.updateOne({ capsule_serial: capsule }, {
        $set: {
          reuse_count,
          landings,
          missions,
        },
      });
    });
  };

  await start();

  if (client) {
    client.close();
  }
})();
