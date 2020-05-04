
const { CronJob } = require('cron');
const webcast = require('./webcast');
const launches = require('./launches');
const payloads = require('./payloads');

const webcastJob = new CronJob('*/10 * * * *', webcast); // Every 10 minutes
const launchesJob = new CronJob('*/10 * * * *', launches); // Every 10 minutes
const payloadsJob = new CronJob('20 * * * *', payloads); // Every hour on :20

webcastJob.start();
launchesJob.start();
payloadsJob.start();
