
const { CronJob } = require('cron');
const webcast = require('./webcast');
const launches = require('./launches');

const webcastJob = new CronJob('*/10 * * * *', webcast);
const launchesJob = new CronJob('*/10 * * * *', launches);

webcastJob.start();
launchesJob.start();
