/**
 * Returns sorting query for past/upcoming launches
*/

exports.launchSort = (req) => {
  const query = {}

  if (req.query.order === "asc") {
    query.flight_number = 1
  } else if (req.query.order === "desc") {
    query.flight_number = -1
  } else {
    query.flight_number = 1
  }

  return query
}
