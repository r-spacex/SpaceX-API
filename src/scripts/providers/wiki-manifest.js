const moment = require('moment-timezone');
const gmail = require('gmail-send');
const cheerio = require('cheerio');
const request = require('request-promise-native');

// RegEx expressions for matching dates in the wiki manifest
// Allows for long months or short months ex. September vs Sep
// Allows for time with or without brackets ex [23:45] vs 23:45

// 2020 Nov 4 [14:10:56]
const second = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s[0-9]{1,2}\s(\[[0-9]{2}:[0-9]{2}:[0-9]{2}\]|[0-9]{2}:[0-9]{2})$/i;

// 2020 Nov 4 [14:10]
const hour = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s[0-9]{1,2}\s(\[[0-9]{2}:[0-9]{2}\]|[0-9]{2}:[0-9]{2})$/i;

// 2020 Nov 4
const day = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s[0-9]{1,2}$/i;

// 2020 Nov
const month = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})$/i;

// 2020
const year = /^[0-9]{4}$/i;

// 2020 TBD
const yearTbd = /^[0-9]{4}\sTBD$/i;

// 2020 Nov TBD
const monthTbd = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\sTBD$/i;

// 2020 Early/Mid/Late Nov
const monthVague = /^[0-9]{4}\s(early|mid|late)\s([a-z]{3}|[a-z]{3,9})$/i;

// 2020 Early/Mid/Late Nov
const monthVagueReverse = /^[0-9]{4}\s([a-z]{3}|[a-z]{3,9})\s(early|mid|late)$/i;

const getData = async () => {
  // Grab subreddit wiki manifest
  const result = await request('https://old.reddit.com/r/spacex/wiki/launches/manifest');
  const $ = cheerio.load(result);

  // Gives us all manifest table rows in a single array
  const manifest = $('body > div.content > div > div > table:nth-child(8) > tbody').text();
  const manifestRow = manifest.split('\n').filter((v) => v !== '');

  // Filter to collect manifest dates
  const manifestDates = manifestRow.filter((_, index) => index % 8 === 0);

  // Filter to collect payload names
  const manifestPayloads = manifestRow.filter((_, index) => (index + 3) % 8 === 0);

  // Filter to collect launchpad names
  const manifestLaunchpads = manifestRow.filter((_, index) => (index + 6) % 8 === 0);

  return { manifestDates, manifestPayloads, manifestLaunchpads };
};

const calculateLaunchSite = (launchpad) => {
  let siteId = null;
  let siteName = null;
  let siteNameLong = null;
  if (launchpad === 'SLC-40' || launchpad === 'SLC-40 / LC-39A' || launchpad === 'SLC-40 / BC') {
    siteId = 'ccafs_slc_40';
    siteName = 'CCAFS SLC 40';
    siteNameLong = 'Cape Canaveral Air Force Station Space Launch Complex 40';
  } else if (launchpad === 'LC-39A' || launchpad === 'LC-39A / BC' || launchpad === 'LC-39A / SLC-40') {
    siteId = 'ksc_lc_39a';
    siteName = 'KSC LC 39A';
    siteNameLong = 'Kennedy Space Center Historic Launch Complex 39A';
  } else if (launchpad === 'SLC-4E') {
    siteId = 'vafb_slc_4e';
    siteName = 'VAFB SLC 4E';
    siteNameLong = 'Vandenberg Air Force Base Space Launch Complex 4E';
  } else if (launchpad === 'BC' || launchpad === 'BC / LC-39A' || launchpad === 'BC / SLC-40') {
    siteId = 'stls';
    siteName = 'STLS';
    siteNameLong = 'SpaceX South Texas Launch Site';
  }
  return { siteId, siteName, siteNameLong };
};

const checkDatePattern = async (mdate) => {
  const result = { mdate };
  // 2020 Q3
  if (mdate.includes('Q')) {
    result.mdate = mdate.replace('Q', '');
    result.precision = 'quarter';
    result.tbd = true;
    result.isTentative = true;
    // 2020 H1
  } else if (mdate.includes('H1')) {
    result.mdate = mdate.replace('H1', '1');
    result.precision = 'half';
    result.tbd = true;
    result.isTentative = true;
    // 2020 H2
  } else if (mdate.includes('H2')) {
    result.mdate = mdate.replace('H2', '3');
    result.precision = 'half';
    result.tbd = true;
    result.isTentative = true;
    // 2020 TBD
  } else if (yearTbd.test(mdate)) {
    result.precision = 'year';
    result.tbd = true;
    result.isTentative = true;
    // 2020
  } else if (year.test(mdate)) {
    result.precision = 'year';
    result.tbd = true;
    result.isTentative = true;
    // 2020 Nov TBD
  } else if (monthTbd.test(mdate)) {
    result.precision = 'month';
    result.tbd = true;
    result.isTentative = true;
    // 2020 Early/Mid/Late Nov
  } else if (monthVague.test(mdate)) {
    result.precision = 'month';
    result.tbd = true;
    result.isTentative = true;
    // 2020 Nov
  } else if (monthVagueReverse.test(mdate)) {
    result.precision = 'month';
    result.tbd = true;
    result.isTentative = true;
    // 2020 Nov
  } else if (month.test(mdate)) {
    result.precision = 'month';
    result.tbd = true;
    result.isTentative = true;
    // 2020 Nov 4
  } else if (day.test(mdate)) {
    result.precision = 'day';
    result.tbd = false;
    result.isTentative = true;
    // 2020 Nov 4 [14:10]
  } else if (hour.test(mdate)) {
    result.precision = 'hour';
    result.tbd = false;
    result.isTentative = false;
  } else if (second.test(mdate)) {
    result.precision = 'hour';
    result.tbd = false;
    result.isTentative = false;
  } else {
    console.log('Date did not match any of the existing regular expressions');
    const send = gmail({
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: process.env.NOTIFY_EMAIL,
      subject: 'Upcoming Launches',
      text: `Date does not match any formats: ${mdate}`,
    });
    await send();
    return null;
  }
  return result;
};

const getLocalTime = (time, location) => {
  if (location === 'ccafs_slc_40' || location === 'ksc_lc_39a' || location === 'ccafs_lc_13') {
    return time.tz('America/New_York').format();
  }
  if (location === 'vafb_slc_4e' || location === 'vafb_slc_4w') {
    return time.tz('America/Los_Angeles').format();
  }
  return time.tz('America/Chicago').format();
};

// Returns the UUIDs and dates of the last 25 revisions of the wiki manifest
const getRevisions = async () => {
  // Grab subreddit wiki manifest revisions
  let result;
  try {
    result = await request('https://old.reddit.com/r/spacex/wiki/revisions/launches/manifest');
    const $ = cheerio.load(result);

    // Get last 25 manifest revisions' HTML
    const revisions = $('#siteTable > table > tbody').html();
    const revisionIDs = revisions.split(/(value="|" checked="yes")/g)
      // Get UUID
      .filter((v) => v.length === 36)
      // Remove duplicates
      .filter((_, index) => index % 2 === 0);

    const revisionDates = revisions.split(/(datetime="|" class="live-timestamp")/g)
      .filter((v) => v.length === 25);

    return { UUID: revisionIDs, date: revisionDates };
  } catch (e) {
    if (result) {
      console.log(e);
    }
    return null;
  }
};

// Returns the launch date and the date of the last update
/*
  lastLaunchDate -> Launch date stored in the DB
  lastDate -> Date of the last revision applied, stored in the DB
  lastRevision -> UUID of the last revision applied, stored in the DB
  newLaunchDate -> Launch date of the current manifest
  newDate -> Date of the revision of the current manifest
  newRevision -> UUID of the revision of the current manifest
*/
const getLastUpdate = (
  lastLaunchDate, lastDate, lastRevisionUUID, // Current dates and IDs
  newLaunchDate, newDate, newRevisionUUID, // New dates and IDs
) => {
  // First check if we are synced with the last revision
  if (lastRevisionUUID === newRevisionUUID) {
    // If up to date, the last update corresponds with the date of the revision,
    // so it remains the same
    return {
      launchDateWiki: moment(lastLaunchDate),
      updateTimeWiki: moment(lastDate),
      lastRevision: lastRevisionUUID,
    };
  }
  // A new revision has been published, check if the launch date changed
  // by comparing launch date from incoming manifest with stored one
  // Also include the case in which there's no previous revision data
  if (moment(lastLaunchDate).diff(moment(newLaunchDate)) !== 0 || !lastLaunchDate) {
    // The dates differ, therefore update the lastDate and the lastRevision
    // Get the launch date from the last revision
    return {
      launchDateWiki: moment(newLaunchDate),
      updateTimeWiki: moment(newDate),
      lastRevision: newRevisionUUID,
    };
  }
  // A revision was published, but the dates didn't change, so the last update remains the same
  return {
    launchDateWiki: moment(lastLaunchDate),
    updateTimeWiki: moment(lastDate),
    lastRevision: lastRevisionUUID,
  };
};

module.exports = {
  getData,
  checkDatePattern,
  calculateLaunchSite,
  getLocalTime,
  getRevisions,
  getLastUpdate,
};
