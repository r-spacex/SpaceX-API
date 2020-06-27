const got = require('got');
const fuzz = require('fuzzball');
const { logger } = require('../middleware/logger');

const YOUTUBE_PREFIX = 'https://youtu.be';
const SPACEX_API = 'https://api.spacexdata.com/v4';
const CHANNEL_ID = 'UCtI0Hodo5o5dUb67FeUjDeA';
const {
  SPACEX_KEY,
  YOUTUBE_KEY,
  WEBCAST_HEALTHCHECK,
} = process.env;

/**
 * Check for new SpaceX webcast links
 * @return {Promise<void>}
 */
module.exports = async () => {
  try {
    // Check if any upcoming streams on youtube
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=upcoming&maxResults=1&type=video&key=${YOUTUBE_KEY}`;
    const upcomingStreams = await got(url, {
      resolveBodyOnly: true,
      responseType: 'json',
    });

    if (upcomingStreams?.items?.length === 1) {
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
      const youtubeTitle = upcomingStreams.items[0].snippet.title;
      const youtubeId = upcomingStreams.items[0].id.videoId;

      // Fuzzy check video title to make sure it's at least related to the launch
      const ratio = fuzz.ratio(youtubeTitle, missionName);
      if (ratio >= 50) {
        await got.patch(`${SPACEX_API}/launches/${launchId}`, {
          json: {
            'links.webcast': `${YOUTUBE_PREFIX}/${youtubeId}`,
            'links.youtube_id': youtubeId,
          },
          headers: {
            'spacex-key': SPACEX_KEY,
          },
        });
        logger.info({
          rawMission: youtubeTitle,
          apiMission: missionName,
          url: `${YOUTUBE_PREFIX}/${youtubeId}`,
          matchRatio: ratio,
          match: true,
        });
      } else {
        logger.info({
          rawMission: youtubeTitle,
          apiMission: missionName,
          url: `${YOUTUBE_PREFIX}/${youtubeId}`,
          matchRatio: ratio,
          match: false,
        });
      }
    } else {
      logger.info({
        match: false,
      });
    }

    if (WEBCAST_HEALTHCHECK) {
      await got(WEBCAST_HEALTHCHECK);
    }
  } catch (error) {
    console.log(error);
  }
};
