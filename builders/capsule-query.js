/**
 * Returns capsule query object from optional querystring inputs 
*/

exports.capsuleQuery = (req) => {
  const query = {}
  
  if (req.query.capsule_serial) {
    query.capsule_serial = req.query.capsule_serial
  }
  if (req.query.status) {
    query.status = req.query.status
  }
  if (req.query.original_launch) {
    query.original_launch = req.query.original_launch
  }
  if (req.query.missions) {
    query.missions = req.query.missions
  }
  if (req.query.landings) {
    query.landings = parseInt(req.query.landings)
  }
  if (req.query.type) {
    query.type = req.query.type
  }
  return query
}
