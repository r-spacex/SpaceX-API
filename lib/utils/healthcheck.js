#!/usr/bin/env node

import got from 'got';

const { HEALTH_URL, SPACEX_WORKER } = process.env;

(async () => {
  try {
    if (SPACEX_WORKER) {
      process.exit(0);
    }
    await got(HEALTH_URL);
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
