#!/usr/bin/env node

/**
 * This script updates landing attempts and successes from each
 * spacex landing pad
 */

const MongoClient = require('mongodb');

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const launch = client.db('spacex-api').collection('launch');

  const lz1Attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-1',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const lz1Successes = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-1',
        land_success: true,
        landing_intent: true,
      },
    },
    launch_success: true,
  });

  const lz2Attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-2',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const lz2Successes = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-2',
        land_success: true,
        landing_intent: true,
      },
    },
    launch_success: true,
  });

  const lz4Attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-4',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const lz4Successes = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-4',
        land_success: true,
        landing_intent: true,
      },
    },
    launch_success: true,
  });

  const ocislyAttempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'OCISLY',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const ocislySuccesses = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'OCISLY',
        land_success: true,
        landing_intent: true,
      },
    },
    launch_success: true,
  });

  const jrtiAttempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'JRTI',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const jrtiSuccesses = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'JRTI',
        land_success: true,
        landing_intent: true,
      },
    },
    launch_success: true,
  });

  const asogAttempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'ASOG',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const asogSuccesses = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'ASOG',
        land_success: true,
        landing_intent: true,
      },
    },
    launch_success: true,
  });

  console.log('LZ-1');
  console.log(`Attempts: ${lz1Attempts}`);
  console.log(`Sucesses: ${lz1Successes}\n`);
  console.log('LZ-2');
  console.log(`Attempts: ${lz2Attempts}`);
  console.log(`Sucesses: ${lz2Successes}\n`);
  console.log('LZ-4');
  console.log(`Attempts: ${lz4Attempts}`);
  console.log(`Sucesses: ${lz4Successes}\n`);
  console.log('OCISLY');
  console.log(`Attempts: ${ocislyAttempts}`);
  console.log(`Sucesses: ${ocislySuccesses}\n`);
  console.log('JRTI');
  console.log(`Attempts: ${jrtiAttempts}`);
  console.log(`Sucesses: ${jrtiSuccesses}\n`);
  console.log('ASOG');
  console.log(`Attempts: ${asogAttempts}`);
  console.log(`Sucesses: ${asogSuccesses}\n`);

  const landpad = client.db('spacex-api').collection('landpad');

  await landpad.updateOne({
    id: 'LZ-1',
  }, {
    $set: {
      attempted_landings: lz1Attempts,
      successful_landings: lz1Successes,
    },
  });
  await landpad.updateOne({
    id: 'LZ-2',
  }, {
    $set: {
      attempted_landings: lz2Attempts,
      successful_landings: lz2Successes,
    },
  });
  await landpad.updateOne({
    id: 'LZ-4',
  }, {
    $set: {
      attempted_landings: lz4Attempts,
      successful_landings: lz4Successes,
    },
  });
  await landpad.updateOne({
    id: 'OCISLY',
  }, {
    $set: {
      attempted_landings: ocislyAttempts,
      successful_landings: ocislySuccesses,
    },
  });
  await landpad.updateOne({
    id: 'JRTI',
  }, {
    $set: {
      attempted_landings: jrtiAttempts,
      successful_landings: jrtiSuccesses,
    },
  });
  await landpad.updateOne({
    id: 'ASOG',
  }, {
    $set: {
      attempted_landings: asogAttempts,
      successful_landings: asogSuccesses,
    },
  });

  const ships = client.db('spacex-api').collection('ship');

  await ships.updateOne({
    ship_id: 'OCISLY',
  }, {
    $set: {
      successful_landings: ocislySuccesses,
      attempted_landings: ocislyAttempts,
    },
  });
  await ships.updateOne({
    ship_id: 'JRTI-2',
  }, {
    $set: {
      successful_landings: jrtiSuccesses,
      attempted_landings: jrtiAttempts,
    },
  });
  await ships.updateOne({
    ship_id: 'ASOG',
  }, {
    $set: {
      successful_landings: asogSuccesses,
      attempted_landings: asogAttempts,
    },
  });


  if (client) {
    client.close();
  }
})();
