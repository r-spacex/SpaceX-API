#!/usr/bin/env node

/**
 * This script gathers current location, status, speed, and course data for all past
 * and present SpaceX barges, support ships, and tugs, and updates it accordingly.
 */

const MongoClient = require('mongodb');
const cheerio = require('cheerio');
const request = require('request-promise-native');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Created so we can use async await with requests, and
// to use async sleep function inside the IIFE
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // Allow await for nested async functions
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    const db = client.db('spacex-api');
    const col = db.collection('ship');
    const data = await col.find({}).sort({ year_built: 1 });

    // Gather individual ship mmsi numbers into array for requests
    const id = [];
    await data.forEach(ship => {
      if (ship.mmsi != null) {
        id.push(ship.mmsi);
      }
    });

    const start = async () => {
      await asyncForEach(id, async num => {
        const result = await request(`https://www.marinetraffic.com/en/ais/details/ships/mmsi:${num}`);

        const $ = cheerio.load(result);

        // Get current lat/long and strip extra characters
        // Raw output: 28.40871° / -80.59808°
        const coordinates = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(4) > span:nth-child(2) > strong > a').text();
        const parsed_coordinates = coordinates.replace('°', '').replace('°', '').split(' / ');

        // Get current ship status fx. Stopped, Moored, Underway...
        // Raw output: Underway Using Engine
        const ship_status = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(5) > span:nth-child(2) > strong').text();

        // Get current ship speed and direction and strip extra characters
        // Raw output: 17.2kn / 67°
        // If the speed is zero, the course returns '-'. This is replaced with null for zero speeds
        const direction = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(6) > span:nth-child(2) > strong').text();
        const parsed_direction = direction.replace('kn', '').replace('°', '').split(' / ');
        let ship_course;
        if (parsed_direction[1] === '-') {
          ship_course = null;
        } else {
          ship_course = parseFloat(parsed_direction[1]);
        }

        const update = {
          latitude: parseFloat(parsed_coordinates[0]),
          longitude: parseFloat(parsed_coordinates[1]),
          status: ship_status,
          speed: parseFloat(parsed_direction[0]),
          course: ship_course,
        };

        console.log(`Updating ${num}...`);
        await col.updateOne({ mmsi: num }, {
          $set: {
            'position.latitude': update.latitude,
            'position.longitude': update.longitude,
            status: update.status,
            speed_kn: update.speed,
            course_deg: update.course,
          },
        });
        console.log('Updated');

        // Wait 5 seconds between page fetches to be respectful of bandwidth
        await sleep(5000);
      });
    };
    await start();
    console.log(`Updated ${id.length} ships`);
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  if (client) {
    client.close();
  }
})();
