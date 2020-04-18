
const { CronJob } = require('cron');
const webcast = require('./webcast');

const webcastJob = new CronJob('* * * * * *', webcast);

webcastJob.start();
