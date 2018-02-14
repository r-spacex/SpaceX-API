/**
 * Returns project query for past/upcoming launches
*/

const lowerCase = require('lower-case');

exports.queryProject = (req) => {
  const query = {};

  if (lowerCase(req.query.id) !== 'true') {
    // Mongo _id field requires underscore dangle
    // eslint-disable-next-line no-underscore-dangle
    query._id = 0;
  }

  return query;
};
