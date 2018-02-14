
const launch = require('../builders/launch-query');
const sort = require('../builders/launch-sort');
const project = require('../builders/project-query');

module.exports.fetchLaunch = async (collection, req) => {
  return global.db
    .collection(collection)
    .find(launch.launchQuery(req))
    .project(project.queryProject(req))
    .sort(sort.launchSort(req))
    .toArray();
};
