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
  const flightNumber = data[0].flight_number;
  const missionName = data[0].mission_name;

  const result = await request('https://www.spacex.com/webcast');
  const $ = cheerio.load(result);

  const embedSource = $('#content > div.left_column > font > iframe').attr('src');
  const embedName = $('#page-title').text();

  const youtubeUrl = embedSource.replace(/https:\/\/www\.youtube\.com\/embed/i, 'https://youtu.be');
  const youtubeId = youtubeUrl.replace(/https:\/\/youtu\.be\//i, '');

  const update = {
    'links.video_link': youtubeUrl,
    'links.youtube_id': youtubeId,
  };

  const ratio = fuzz.ratio(embedName.replace(/mission/i, ''), missionName.replace(/mission/i, ''));

  console.log(embedName);
  console.log(missionName);
  console.log(update);
  console.log(ratio);

  // Might need to play with this ratio, but 50% match should be good enough to
  // reasonably assume it's the correct mission. Worst case, if it doesn't pick it
  // up correctly, the data would be entered regardless, this script is purely for convenience
  if (ratio >= 50) {
    console.log('Match');
    await launch.updateOne({ upcoming: true, flight_number: flightNumber }, { $set: { 'links.video_link': youtubeUrl, 'links.youtube_id': youtubeId } });
  }

  if (client) {
    client.close();
  }
})();
