import { CronJob } from 'cron';
import dotenv from 'dotenv';
import { logger } from '../middleware/index.js';
import launches from './launches.js';
import payloads from './payloads.js';
import landpads from './landpads.js';
import launchpads from './launchpads.js';
import capsules from './capsules.js';
import cores from './cores.js';
import roadster from './roadster.js';
import upcoming from './upcoming.js';
import starlink from './starlink.js';
import webcast from './webcast.js';
import launchLibrary from './launch-library.js';

// Env init
dotenv.config();

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

// Every 5 minutes
const webcastJob = new CronJob('*/5 * * * *', webcast);

// Every hour on :45
const launchLibraryJob = new CronJob('45 * * * *', launchLibrary);

try {
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
  launchLibraryJob.start();
} catch (error) {
  const formatted = {
    name: 'worker',
    error: error.message,
    stack: error.stack,
  };
  logger.error(formatted);
}
