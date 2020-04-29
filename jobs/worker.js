
const { CronJob } = require('cron');
const webcast = require('./webcast');

const webcastJob = new CronJob('*/10 * * * *', webcast);

webcastJob.start();
