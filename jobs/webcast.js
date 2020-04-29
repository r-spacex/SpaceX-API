
const got = require('got');
const cheerio = require('cheerio');
const fuzz = require('fuzzball');
const { logger } = require('../middleware/logger');

const SPACEX_WEBCAST = 'https://www.spacex.com/webcast';
const SPACEX_API = 'https://stage.spacexdata.com/v4';
const KEY = process.env.SPACEX_KEY;
const HEALTHCHECK = process.env.WEBCAST_HEALTHCHECK;

/**
 * Check for new SpaceX webcast links
 * @return {Promise<void>}
 */
module.exports = async () => {
  const launches = await got.post(`${SPACEX_API}/launches/query`, {
    json: {
      query: {
        upcoming: true,
      },
      options: {
        sort: {
          flight_number: 'asc',
        },
        limit: 1,
      },
    },
    resolveBodyOnly: true,
    responseType: 'json',
  });

  const launchId = launches.docs[0].id;
  const missionName = launches.docs[0].name;

  // Get most recent launch youtube link
  const previousLaunches = await got.post(`${SPACEX_API}/launches/query`, {
    json: {
      query: {
        upcoming: false,
      },
      options: {
        sort: {
          flight_number: 'desc',
        },
        limit: 1,
      },
    },
    resolveBodyOnly: true,
    responseType: 'json',
  });

  const prevYoutubeUrl = previousLaunches.docs[0].links.webcast;

  const response = await got(SPACEX_WEBCAST);
  const $ = cheerio.load(response.body);

  const embedSource = $('#content > div.left_column > font > iframe').attr('src');
  const embedName = $('#page-title').text();

  const youtubeUrl = embedSource.replace(/https:\/\/www\.youtube\.com\/embed/i, 'https://youtu.be');
  const youtubeId = youtubeUrl.replace(/https:\/\/youtu\.be\//i, '');

  const update = {
    'links.video_link': youtubeUrl,
    'links.youtube_id': youtubeId,
  };

  const ratio = fuzz.ratio(embedName.replace(/mission/i, ''), missionName.replace(/mission/i, ''));

  // Check if most recent launch matches
  // Prevents early triggering for extremely similar launch names
  if (prevYoutubeUrl === youtubeUrl) {
    logger.info({
      rawMission: embedName,
      apiMission: missionName,
      update,
      matchRatio: ratio,
      match: false,
      matchesRecent: true,
    });
  // Might need to play with this ratio, but 50% match should be good enough to
  // reasonably assume it's the correct mission. Worst case, if it doesn't pick it
  // up correctly, the data would be entered regardless, this script is purely for convenience
  } else if (ratio >= 50) {
    logger.info({
      rawMission: embedName,
      apiMission: missionName,
      update,
      matchRatio: ratio,
      match: true,
      matchesRecent: false,
    });
    await got.patch(`${SPACEX_API}/launches/${launchId}`, {
      json: {
        'links.webcast': youtubeUrl,
        'links.youtube_id': youtubeId,
      },
      headers: {
        'spacex-key': KEY,
      },
    });
  } else {
    logger.info({
      rawMission: embedName,
      apiMission: missionName,
      update,
      matchRatio: ratio,
      match: false,
      matchesRecent: false,
    });
  }

  if (HEALTHCHECK) {
    await got(HEALTHCHECK);
  }
};
