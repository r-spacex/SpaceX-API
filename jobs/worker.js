
const { CronJob } = require('cron');
const webcast = require('./webcast');
const launches = require('./launches');
const payloads = require('./payloads');
const landpads = require('./landpads');
const launchpads = require('./launchpads');
const capsules = require('./capsules');
const cores = require('./cores');
const roadster = require('./roadster');

// Every 10 minutes
const webcastJob = new CronJob('*/10 * * * *', webcast);

// Every 10 minutes
const launchesJob = new CronJob('*/10 * * * *', launches);

// Every hour on :20
const payloadsJob = new CronJob('20 * * * *', payloads);

// Every 10 minutes
const landpadsJob = new CronJob('*/10 * * * *', landpads);

// Every 10 minutes
const launchpadsJob = new CronJob('*/10 * * * *', launchpads);

// Every 10 minutes
const capsulesJob = new CronJob('*/10 * * * *', capsules);

// Every 10 minutes
const coresJob = new CronJob('*/10 * * * *', cores);

// Every 10 minutes
const roadsterJob = new CronJob('*/10 * * * *', roadster);

webcastJob.start();
launchesJob.start();
payloadsJob.start();
landpadsJob.start();
launchpadsJob.start();
capsulesJob.start();
coresJob.start();
roadsterJob.start();
