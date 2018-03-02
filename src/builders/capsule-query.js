
/**
 * Builds Mongo query for capsule data endpoints from querystrings
 * @param {Object} req The Express request object to build queries
 * @return {Object} Mongo compatible query object
 */

module.exports.capsuleQuery = (req) => {
  const query = {};

  if (req.query.capsule_serial) {
    query.capsule_serial = req.query.capsule_serial;
  }
  if (req.query.capsule_id) {
    query.capsule_id = req.query.capsule_id;
  }
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.original_launch) {
    query.original_launch = req.query.original_launch;
  }
  if (req.query.missions) {
    query.missions = req.query.missions;
  }
  if (req.query.landings) {
    query.landings = parseInt(req.query.landings, 10);
  }
  if (req.query.type) {
    query.type = req.query.type;
  }
  return query;
};
