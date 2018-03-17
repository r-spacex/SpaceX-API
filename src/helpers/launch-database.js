
const launch = require('../builders/launch-query');
const sort = require('../builders/launch-sort');
const project = require('../builders/project-query');

/**
 * Fetches past or upcoming launches with built queries
 * @param {string} collection The Mongo collection to search
 * @param {Object} request The Express request object to build queries
 * @return {Array} The Mongo array of objects
 */

module.exports.fetchLaunch = async (collection, request) => {
  return global.db
    .collection(collection)
    .find(launch.launchQuery(request))
    .project(project.queryProject(request))
    .sort(sort.launchSort(request))
    .toArray();
};
