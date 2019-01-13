#!/usr/bin/env node

/**
 * This script updates the youtube link and youtube video id for the next upcoming launch
 */

const MongoClient = require('mongodb');
const cheerio = require('cheerio');
const request = require('request-promise-native');
const fuzz = require('fuzzball');

(async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }

  const launch = client.db('spacex-api').collection('launch');

  const data = await launch.find({ upcoming: true }).sort({ flight_number: 1 }).limit(1).toArray();
  const { flight_number } = data[0];
  const { mission_name } = data[0];

  const result = await request('https://www.spacex.com/webcast');
  const $ = cheerio.load(result);

  const embedSource = $('.left_column > font:nth-child(1) > iframe:nth-child(4)').attr('src');
  const embedName = $('#page-title').text();

  const youtube_url = embedSource.replace(/https:\/\/www\.youtube\.com\/embed/i, 'https://youtu.be');
  const youtube_id = youtube_url.replace(/https:\/\/youtu\.be\//i, '');

  const update = {
    'links.video_link': youtube_url,
    'links.youtube_id': youtube_id,
  };

  const ratio = fuzz.ratio(embedName.replace(/mission/i, ''), mission_name.replace(/mission/i, ''));

  console.log(embedName);
  console.log(mission_name);
  console.log(update);
  console.log(ratio);

  // Might need to play with this ratio, but 50% match should be good enough to reasonably assume it's
  // the correct mission. Worst case, if it doesn't pick it up correctly, the data would be entered regardless,
  // this script is purely for convenience
  if (ratio >= 50) {
    console.log('Match');
    await launch.updateOne({ upcoming: true, flight_number }, { $set: { update } });
  }

  if (client) {
    client.close();
  }
})();
