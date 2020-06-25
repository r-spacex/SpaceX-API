const moment = require('moment-timezone');
const cheerio = require('cheerio');
const request = require('request-promise-native');
const gmail = require('gmail-send');

const getData = async () => {
  // Grab subreddit wiki manifest
  const result = await request('https://old.reddit.com/r/spacex/wiki/launches/manifest');
  const $ = cheerio.load(result);

  // Gives us all manifest table rows in a single array
  const manifest = $('body > div.content > div > div > table:nth-child(10) > tbody').text();
  if (!manifest) {
    console.log('Broken wiki selector');
    const send = gmail({
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: process.env.NOTIFY_EMAIL,
      subject: 'Upcoming Launches',
      text: `Broken wiki selctor: ${manifest}`,
    });
    await send();
    process.exit(1);
  }

  const manifestRow = manifest.split('\n').filter((v) => v !== '');

  // Filter to collect manifest dates
  const allManifestDates = manifestRow.filter((_, index) => index % 8 === 0);
  const manifestDates = allManifestDates.slice(0, 30);

  // Filter to collect payload names
  const allManifestPayloads = manifestRow.filter((_, index) => (index + 3) % 8 === 0);
  const manifestPayloads = allManifestPayloads.slice(0, 30);

  // Filter to collect launchpad names
  const allManifestLaunchpads = manifestRow.filter((_, index) => (index + 6) % 8 === 0);
  const manifestLaunchpads = allManifestLaunchpads.slice(0, 30);

  return { manifestDates, manifestPayloads, manifestLaunchpads };
};

const calculateLaunchSite = (launchpad) => {
  let siteId = null;
  let siteName = null;
  let siteNameLong = null;
  if (launchpad === 'SLC-40' || launchpad === 'SLC-40 / LC-39A' || launchpad === 'SLC-40 / BC' || launchpad === 'SLC-40, LC-39A') {
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
  // RegEx expressions for matching dates in the wiki manifest
  // Allows for long months or short months ex: September vs Sep
  // Allows for time with or without brackets ex: [23:45] vs 23:45

  // Anything with TBD/TBA in date
  const tbd = /^.*(tbd|tba).*$/i;

  // Anything with a time set
  const tentative = /^.*(\[?[0-9]{2}:[0-9]{2}\]?).*$/i;

  // 2020
  const year = /^\s*[0-9]{4}\s*$/i;

  // 2020 Nov
  const month = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*$/i;

  // 2020 Nov 4
  const day = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*[0-9]{1,2}\s*$/i;

  // 2020 Nov 4 [14:10]
  const hour = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*[0-9]{1,2}\s*(\[?\s*[0-9]{2}:[0-9]{2}\s*\]?)\s*$/i;

  // 2020 Nov 4 [14:10]
  const second = /^\s*[0-9]{4}\s*([a-z]{3}|[a-z]{3,9})\s*[0-9]{1,2}\s*(\[?\s*[0-9]{2}:[0-9]{2}:[0-9]{2}\s*\]?)\s*$/i;

  const result = {
    mdate,
  };

  // Check if date contains TBD
  if (tbd.test(mdate)) {
    result.tbd = true;
  } else {
    result.tbd = false;
  }

  // Remove extra stuff humans might add
  // NOTE: Add to this when people add unexpected things to dates in the wiki
  const cleaned = mdate.replace(/(~|early|mid|late|end|tbd|tba)/gi, ' ').split('/')[0].trim();
  console.log(cleaned);

  // Set tentativeness
  // Only true when a time is available
  if (tentative.test(cleaned)) {
    result.isTentative = false;
  } else {
    result.isTentative = true;
  }

  // Set date precision
  if (cleaned.includes('Q')) {
    // Quarter is first because moment.js does not make
    // a distinction between half vs quarter. Therefore
    // the first half starts at the beginning Q1, and the
    // second half starts at the beginning of Q3
    result.mdate = mdate.replace('Q', '');
    result.precision = 'quarter';
  } else if (cleaned.includes('H1')) {
    result.mdate = mdate.replace('H1', '1');
    result.precision = 'half';
  } else if (cleaned.includes('H2')) {
    result.mdate = mdate.replace('H2', '3');
    result.precision = 'half';
  } else if (year.test(cleaned)) {
    result.precision = 'year';
  } else if (month.test(cleaned)) {
    result.precision = 'month';
  } else if (day.test(cleaned)) {
    result.precision = 'day';
  } else if (hour.test(cleaned)) {
    result.precision = 'hour';
  } else if (second.test(cleaned)) {
    result.precision = 'hour';
  } else {
    // Send notification
    console.log(`No match: ${cleaned}`);
    const send = gmail({
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: process.env.NOTIFY_EMAIL,
      subject: 'Upcoming Launches',
      text: `No date match: ${cleaned}`,
    });
    await send();
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
