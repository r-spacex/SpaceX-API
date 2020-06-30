const { CronJob } = require('cron');
const launches = require('./launches');
const payloads = require('./payloads');
const landpads = require('./landpads');
const launchpads = require('./launchpads');
const capsules = require('./capsules');
const cores = require('./cores');
const roadster = require('./roadster');
const upcoming = require('./upcoming');
const starlink = require('./starlink');
const webcast = require('./webcast');

// Every 10 minutes
const launchesJob = new CronJob('*/10 * * * *', launches);

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

// Every 10 minutes
const upcomingJob = new CronJob('*/10 * * * *', upcoming);

// Every hour on :25
const payloadsJob = new CronJob('25 * * * *', payloads);

// Every hour on :35
const starlinkJob = new CronJob('35 * * * *', starlink);

// Every hour on :45
const webcastJob = new CronJob('45 * * * *', webcast);

launchesJob.start();
payloadsJob.start();
landpadsJob.start();
launchpadsJob.start();
capsulesJob.start();
coresJob.start();
roadsterJob.start();
upcomingJob.start();
starlinkJob.start();
webcastJob.start();
