
const { CronJob } = require('cron');
const orbits = require('./orbits');

const orbitsJob = new CronJob('0 * * * *', orbits);

orbitsJob.start();
