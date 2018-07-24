#!/usr/bin/env node

/**
 * This updater scrapes calculated roadster orbital data, strips everthing
 * but numbers, and updates a mongo document with the results
 */

const MongoClient = require('mongodb');
const puppeteer = require('puppeteer');

let client;

(async () => {
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    const db = client.db('spacex-api');
    const col = db.collection('info');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://where-is-tesla-roadster.space/live');

    let parsed = {};
    let document;

    // Create object for mongo update using HTML id's for each table element
    // Speed + Distance values don't have an inner span element, hence the textContent swap
    const data = await page.evaluate(() => {
      parsed = {
        apoapsis_au: parseFloat((document.querySelector('#data_ra_au').innerText).replace(/[a-z]/gi, '')),
        periapsis_au: parseFloat((document.querySelector('#data_rp_au').innerText).replace(/[a-z]/gi, '')),
        semi_major_axis_au: parseFloat((document.querySelector('#data_a_au').innerText).replace(/[a-z]/gi, '')),
        eccentricity: parseFloat((document.querySelector('#data_e').innerText).replace(/[a-z]/gi, '')),
        inclination: parseFloat((document.querySelector('#data_i').innerText).replace(/[a-z]/gi, '')),
        longitude: parseFloat((document.querySelector('#data_O').innerText).replace(/[a-z]/gi, '')),
        periapsis_arg: parseFloat((document.querySelector('#data_w').innerText).replace(/[a-z]/gi, '')),
        period_days: parseFloat((document.querySelector('#data_T_d').innerText).replace(/[a-z]/gi, '')),
        speed_kph: parseFloat((document.querySelector('#data_os_kmh').textContent).replace(/[a-z]/gi, '')),
        speed_mph: parseFloat((document.querySelector('#data_os_mph').textContent).replace(/[a-z]/gi, '')),
        earth_distance_km: parseFloat((document.querySelector('#data_de_km').textContent).replace(/[a-z]/gi, '')),
        earth_distance_mi: parseFloat((document.querySelector('#data_de_mile').textContent).replace(/[a-z]/gi, '')),
        mars_distance_km: parseFloat((document.querySelector('#data_dm_km').textContent).replace(/[a-z]/gi, '')),
        mars_distance_mi: parseFloat((document.querySelector('#data_dm_mile').textContent).replace(/[a-z]/gi, '')),
      };
      return parsed;
    });
    console.log(data);
    await browser.close();

    await col.updateOne({ name: 'Elon Musk\'s Tesla Roadster' }, { $set: data });
    console.log('Updated!');
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  if (client) {
    client.close();
  }
})();
