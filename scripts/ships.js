#!/usr/bin/env node

/**
 * This script gathers current location, status, speed, and course data for all past
 * and present SpaceX barges, support ships, and tugs, and updates it accordingly.
 */

const MongoClient = require('mongodb');
const cheerio = require('cheerio');
const request = require('request-promise-native');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const col = client.db('spacex-api').collection('ship');
  const data = await col.find({}).sort({ year_built: 1 });

  // Gather individual ship mmsi numbers into array for requests
  const id = [];
  const names = [];
  await data.forEach(ship => {
    if (ship.mmsi != null) {
      id.push(ship.mmsi);
    }
    names.push(ship.ship_id);
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
  const finish = async () => {
    await asyncForEach(names, async name => {
      const missions = [];
      const launches = client.db('spacex-api').collection('launch');
      const launch_results = await launches.find({ upcoming: false, ships: name }).project({ _id: 0, flight_number: 1, mission_name: 1 }).sort({ flight_number: 1 }).toArray();

      launch_results.forEach(launch => {
        const mission = {
          name: launch.mission_name,
          flight: launch.flight_number,
        };
        missions.push(mission);
      });
      console.log(name);
      console.log(missions);

      await col.updateOne({ ship_id: name }, { $set: { missions } });

      if (name === 'MRSTEVEN') {
        console.log('Mr Steven');
        const attempted_catches = await launches.countDocuments({
          upcoming: false,
          launch_success: true,
          'rocket.fairings.ship': 'MR STEVEN',
          'rocket.fairings.recovery_attempt': true,
        });
        const successful_catches = await launches.countDocuments({
          upcoming: false,
          launch_success: true,
          'rocket.fairings.ship': 'MR STEVEN',
          'rocket.fairings.recovered': true,
        });
        console.log(`Attempts: ${attempted_catches}`);
        console.log(`Successes: ${successful_catches}\n`);
        await col.updateOne({ ship_id: name }, { $set: { attempted_catches, successful_catches } });
      }
    });
  };
  await start();
  await finish();
  console.log(`Updated ${id.length} ships`);

  if (client) {
    client.close();
  }
})();
