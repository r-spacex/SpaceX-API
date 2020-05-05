
const { CronJob } = require('cron');
const webcast = require('./webcast');
const launches = require('./launches');
const payloads = require('./payloads');
const landpads = require('./landpads');
const launchpads = require('./launchpads');

const webcastJob = new CronJob('*/10 * * * *', webcast); // Every 10 minutes
const launchesJob = new CronJob('*/10 * * * *', launches); // Every 10 minutes
const payloadsJob = new CronJob('20 * * * *', payloads); // Every hour on :20
const landpadsJob = new CronJob('*/10 * * * *', landpads); // Every 10 minutes
const launchpadsJob = new CronJob('*/10 * * * *', launchpads); // Every 10 minutes

webcastJob.start();
launchesJob.start();
payloadsJob.start();
landpadsJob.start();
launchpadsJob.start();
