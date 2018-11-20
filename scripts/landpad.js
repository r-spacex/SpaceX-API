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

  const lz1_attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-1',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const lz1_successes = await launch.countDocuments({
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

  const lz2_attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-2',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const lz2_successes = await launch.countDocuments({
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

  const lz4_attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'LZ-4',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const lz4_successes = await launch.countDocuments({
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

  const ocisly_attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'OCISLY',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const ocisly_successes = await launch.countDocuments({
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

  const jrti_attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'JRTI',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const jrti_successes = await launch.countDocuments({
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

  const asog_attempts = await launch.countDocuments({
    upcoming: false,
    'rocket.first_stage.cores': {
      $elemMatch: {
        landing_vehicle: 'ASOG',
        landing_intent: true,
      },
    },
    launch_success: true,
  });
  const asog_successes = await launch.countDocuments({
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
  console.log(`Attempts: ${lz1_attempts}`);
  console.log(`Sucesses: ${lz1_successes}\n`);
  console.log('LZ-2');
  console.log(`Attempts: ${lz2_attempts}`);
  console.log(`Sucesses: ${lz2_successes}\n`);
  console.log('LZ-4');
  console.log(`Attempts: ${lz4_attempts}`);
  console.log(`Sucesses: ${lz4_successes}\n`);
  console.log('OCISLY');
  console.log(`Attempts: ${ocisly_attempts}`);
  console.log(`Sucesses: ${ocisly_successes}\n`);
  console.log('JRTI');
  console.log(`Attempts: ${jrti_attempts}`);
  console.log(`Sucesses: ${jrti_successes}\n`);
  console.log('ASOG');
  console.log(`Attempts: ${asog_attempts}`);
  console.log(`Sucesses: ${asog_successes}\n`);

  const landpad = client.db('spacex-api').collection('landpad');

  await landpad.updateOne({
    id: 'LZ-1',
  }, {
    $set: {
      attempted_landings: lz1_attempts,
      successful_landings: lz1_successes,
    },
  });
  await landpad.updateOne({
    id: 'LZ-2',
  }, {
    $set: {
      attempted_landings: lz2_attempts,
      successful_landings: lz2_successes,
    },
  });
  await landpad.updateOne({
    id: 'LZ-4',
  }, {
    $set: {
      attempted_landings: lz4_attempts,
      successful_landings: lz4_successes,
    },
  });
  await landpad.updateOne({
    id: 'OCISLY',
  }, {
    $set: {
      attempted_landings: ocisly_attempts,
      successful_landings: ocisly_successes,
    },
  });
  await landpad.updateOne({
    id: 'JRTI',
  }, {
    $set: {
      attempted_landings: jrti_attempts,
      successful_landings: jrti_successes,
    },
  });
  await landpad.updateOne({
    id: 'ASOG',
  }, {
    $set: {
      attempted_landings: asog_attempts,
      successful_landings: asog_successes,
    },
  });

  const ships = client.db('spacex-api').collection('ship');

  await ships.updateOne({
    ship_id: 'OCISLY',
  }, {
    $set: {
      successful_landings: ocisly_successes,
      attempted_landings: ocisly_attempts,
    },
  });
  await ships.updateOne({
    ship_id: 'JRTI-2',
  }, {
    $set: {
      successful_landings: jrti_successes,
      attempted_landings: jrti_attempts,
    },
  });
  await ships.updateOne({
    ship_id: 'ASOG',
  }, {
    $set: {
      successful_landings: asog_successes,
      attempted_landings: asog_attempts,
    },
  });


  if (client) {
    client.close();
  }
})();
