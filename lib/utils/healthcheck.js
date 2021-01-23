#!/usr/bin/env node

const got = require('got');

const { HEALTH_URL } = process.env;

(async () => {
  try {
    await got(HEALTH_URL);
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
