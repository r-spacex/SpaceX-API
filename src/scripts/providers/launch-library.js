const moment = require('moment-timezone');
const request = require('request-promise-native');
const fuzz = require('fuzzball');

// Launch Library settings

// Request next 100 launches (for reference, current amount is around 40)
// lsp=121 means that SpaceX is the agency that launches
const launchLibraryURL = 'https://launchlibrary.net/1.4/launch?next=100&lsp=121';

// Minimum partial ratio from the fuzzy match, needed to accept a LL mission
const minimumPartialRatio = 90;


// Returns the processed fields
const nextLaunches = async () => {
  let resultLL;
  try {
    resultLL = await request(launchLibraryURL);
    resultLL = JSON.parse(resultLL);
    // Save only 'name', net' and 'changed'
    const unwrap = ({ name, net, changed }) => ({ name, net, changed });
    return resultLL.launches.map((launch) => unwrap(launch));
    // Format: November 4, 2019 00:00:00 UTC
  } catch (e) {
    if (resultLL) {
      console.log(e);
    }
    // LL is unreachable, so we don't return any launches
    return null;
  }
};

const getLastUpdate = (launches, missionName) => {
  // Fuzzy match against the stored list to use
  let bestMatch = [-1, 0];
  launches.forEach((launch, index) => {
    // Fuzzy match between local name and LL name
    const partialRatio = fuzz.partial_ratio(missionName, launch.name);
    // Return best match
    if (partialRatio > bestMatch[1]) {
      bestMatch = [index, partialRatio];
    }
  });
  // Check that partial ratio is above the minimum
  if (bestMatch[0] !== -1 && bestMatch[1] >= minimumPartialRatio) {
    const launch = launches[bestMatch[0]];
    const launchDate = moment(launch.net.replace('UTC', 'Z'), 'MMMM D, YYYY hh:mm:ss Z');
    const changed = moment(launch.changed, 'YYYY-MM-DD hh:mm:ss');
    return {
      launchDateLL: launchDate,
      updateTimeLL: changed,
    };
  }
  return null;
};

module.exports = {
  nextLaunches,
  getLastUpdate,
};
