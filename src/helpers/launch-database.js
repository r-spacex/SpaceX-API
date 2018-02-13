const launch = require('../builders/launch-query');
const sort = require('../builders/launch-sort');

module.exports.fetchLaunch = async (collection, req) => {
  return global.db
    .collection(collection)
    .find(launch.launchQuery(req))
    .project({ _id: 0 })
    .sort(sort.launchSort(req))
    .toArray();
};
