#!/usr/bin/env node

const MongoClient = require('mongodb');
const cheerio = require('cheerio');
const request = require('request-promise-native');

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

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
        const coordinates = $('#tabs-last-pos > div > div > div.table-cell.cell-full.collapse-768 > div:nth-child(4) > span:nth-child(2) > strong > a').text();

        // Strip dividing slash and degrees symbol
        // Raw output: 28.40871° / -80.59808°
        let clean = coordinates.replace('°', '').replace('°', '');
        clean = clean.split(' / ');
        console.log(clean);

        const update = {
          latitude: parseFloat(clean[0]),
          longitude: parseFloat(clean[1]),
        };

        console.log(`Updating ${num}...`);
        await col.updateOne({ mmsi: num }, {
          $set: {
            'position.latitude': update.latitude,
            'position.longitude': update.longitude,
          },
        });
        console.log('Updated');
        await sleep(5000);
      });
    };
    await start();
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  if (client) {
    client.close();
  }
})();
