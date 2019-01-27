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

  const slc4eAttempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'vafb_slc_4e' });
  const slc4eSuccesses = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'vafb_slc_4e', launch_success: true });

  const slc40Attempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ccafs_slc_40' });
  const slc40Successes = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ccafs_slc_40', launch_success: true });

  const lc39aAttempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ksc_lc_39a' });
  const lc39aSuccesses = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'ksc_lc_39a', launch_success: true });

  const stlsAttempts = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'stls' });
  const stlsSuccesses = await launch.countDocuments({ upcoming: false, 'launch_site.site_id': 'stls', launch_success: true });

  console.log('SLC 4E');
  console.log(`Attempts: ${slc4eAttempts}`);
  console.log(`Sucesses: ${slc4eSuccesses}\n`);
  console.log('SLC 40');
  console.log(`Attempts: ${slc40Attempts}`);
  console.log(`Sucesses: ${slc40Successes}\n`);
  console.log('LC 39A');
  console.log(`Attempts: ${lc39aAttempts}`);
  console.log(`Sucesses: ${lc39aSuccesses}\n`);
  console.log('STLS');
  console.log(`Attempts: ${stlsAttempts}`);
  console.log(`Sucesses: ${stlsSuccesses}`);

  const launchpad = client.db('spacex-api').collection('launchpad');

  await launchpad.updateOne({ id: 'vafb_slc_4e' }, { $set: { attempted_launches: slc4eAttempts, successful_launches: slc4eSuccesses } });
  await launchpad.updateOne({ id: 'ccafs_slc_40' }, { $set: { attempted_launches: slc40Attempts, successful_launches: slc40Successes } });
  await launchpad.updateOne({ id: 'ksc_lc_39a' }, { $set: { attempted_launches: lc39aAttempts, successful_launches: lc39aSuccesses } });
  await launchpad.updateOne({ id: 'stls' }, { $set: { attempted_launches: stlsAttempts, successful_launches: stlsSuccesses } });


  if (client) {
    client.close();
  }
})();
