/**
 * Returns sorting query for past/upcoming launches
*/

const lowerCase = require('lower-case');

exports.launchSort = (req) => {
  const query = {};

  if (lowerCase(req.query.order) === 'asc') {
    query.flight_number = 1;
  } else if (lowerCase(req.query.order) === 'desc') {
    query.flight_number = -1;
  } else {
    query.flight_number = 1;
  }

  return query;
};
