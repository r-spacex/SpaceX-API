#!/usr/bin/env node

/**
 * This script updates launch attempts and successes from each
 * spacex launchpad
 */

const MongoClient = require('mongodb');

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const launch = client.db('spacex-api').collection('launch');

  const slc4e_attempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'vafb_slc_4e' });
  const slc4e_successes = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'vafb_slc_4e', launch_success: true });

  const slc40_attempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ccafs_slc_40' });
  const slc40_successes = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ccafs_slc_40', launch_success: true });

  const lc39a_attempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ksc_lc_39a' });
  const lc39a_successes = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ksc_lc_39a', launch_success: true });

  const stls_attempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'stls' });
  const stls_successes = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'stls', launch_success: true });

  console.log('SLC 4E');
  console.log(`Attempts: ${slc4e_attempts}`);
  console.log(`Sucesses: ${slc4e_successes}\n`);
  console.log('SLC 40');
  console.log(`Attempts: ${slc40_attempts}`);
  console.log(`Sucesses: ${slc40_successes}\n`);
  console.log('LC 39A');
  console.log(`Attempts: ${lc39a_attempts}`);
  console.log(`Sucesses: ${lc39a_successes}\n`);
  console.log('STLS');
  console.log(`Attempts: ${stls_attempts}`);
  console.log(`Sucesses: ${stls_successes}`);

  const launchpad = client.db('spacex-api').collection('launchpad');

  await launchpad.updateOne({ id: 'vafb_slc_4e' }, { $set: { attempted_launches: slc4e_attempts, successful_launches: slc4e_successes } });
  await launchpad.updateOne({ id: 'ccafs_slc_40' }, { $set: { attempted_launches: slc40_attempts, successful_launches: slc40_successes } });
  await launchpad.updateOne({ id: 'ksc_lc_39a' }, { $set: { attempted_launches: lc39a_attempts, successful_launches: lc39a_successes } });
  await launchpad.updateOne({ id: 'stls' }, { $set: { attempted_launches: stls_attempts, successful_launches: stls_successes } });


  if (client) {
    client.close();
  }
})();
