#!/usr/bin/env node

/**
 * This script gathers current location, status, speed, and course data for all past
 * and present SpaceX barges, support ships, and tugs, and updates it accordingly.
 */

const MongoClient = require('mongodb');
const cheerio = require('cheerio');
const request = require('request-promise-native');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  await data.forEach((ship) => {
    if (ship.mmsi != null) {
      id.push(ship.mmsi);
    }
    names.push(ship.ship_id);
  });

  for await (const num of id) {
    const result = await request(`https://www.marinetraffic.com/en/ais/details/ships/mmsi:${num}`);

    const $ = cheerio.load(result);

    // Get current lat/long and strip extra characters
    // Raw output: 28.40871° / -80.59808°
    const coordinates = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(4) > span:nth-child(2) > strong > a').text();
    const parsedCoordinates = coordinates.replace('°', '').replace('°', '').split(' / ');

    // Get current ship status fx. Stopped, Moored, Underway...
    // Raw output: Underway Using Engine
    const shipStatus = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(5) > span:nth-child(2) > strong').text();

    // Get current ship speed and direction and strip extra characters
    // Raw output: 17.2kn / 67°
    // If the speed is zero, the course returns '-'. This is replaced with null for zero speeds
    const direction = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(6) > span:nth-child(2) > strong').text();
    const parsedDirection = direction.replace('kn', '').replace('°', '').split(' / ');
    let shipCourse;
    if (parsedDirection[1] === '-') {
      shipCourse = null;
    } else {
      shipCourse = parseFloat(parsedDirection[1]);
    }

    const update = {
      latitude: parseFloat(parsedCoordinates[0]),
      longitude: parseFloat(parsedCoordinates[1]),
      status: shipStatus,
      speed: parseFloat(parsedDirection[0]),
      course: shipCourse,
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
  }

  for await (const name of names) {
    const missions = [];
    const launches = client.db('spacex-api').collection('launch');
    const launchResults = await launches
      .find({ upcoming: false, ships: name })
      .project({ _id: 0, flight_number: 1, mission_name: 1 })
      .sort({ flight_number: 1 })
      .toArray();

    launchResults.forEach((launch) => {
      const mission = {
        name: launch.mission_name,
        flight: launch.flight_number,
      };
      missions.push(mission);
    });
    console.log(name);
    console.log(missions);

    await col.updateOne({ ship_id: name }, { $set: { missions } });

    if (name === 'GOMSTREE') {
      console.log('GO Ms Tree');
      const attemptedCatches = await launches.countDocuments({
        upcoming: false,
        launch_success: true,
        'rocket.fairings.ship': 'GOMSTREE',
        'rocket.fairings.recovery_attempt': true,
      });
      const successfulCatches = await launches.countDocuments({
        upcoming: false,
        launch_success: true,
        'rocket.fairings.ship': 'GOMSTREE',
        'rocket.fairings.recovered': true,
      });
      console.log(`Attempts: ${attemptedCatches}`);
      console.log(`Successes: ${successfulCatches}\n`);
      await col.updateOne({ ship_id: name }, {
        $set: {
          attempted_catches: attemptedCatches,
          successful_catches: successfulCatches,
        },
      });
    }
  }
  console.log(`Updated ${id.length} ships`);

  if (client) {
    client.close();
  }
})();
