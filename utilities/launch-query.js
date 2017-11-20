// Module build past launch queries

exports.queryBuilder = (req) => {
  let query = {}

  if (req.query.launch_year) {
    query.launch_year = req.query.launch_year
  }
  if (req.query.launch_date_utc) {
    query.launch_date_utc = req.query.launch_date_utc
  }
  if (req.query.launch_date_local) {
    query.launch_date_local = req.query.launch_date_local
  }
  if (req.query.start && req.query.final) {
    query.launch_date_utc = {"$gte": `${req.query.start}T00:00:00Z`, "$lte": `${req.query.final}T00:00:00Z`}
  }
  if (req.query.site_id) {
    query["launch_site.site_id"] = req.query.site_id
  }
  if (req.query.site_name) {
    query["launch_site.site_name"] = req.query.site_name
  }
  if (req.query.rocket_id) {
    query["rocket.rocket_id"] = req.query.rocket_id
  }
  if (req.query.rocket_name) {
    query["rocket.rocket_name"] = req.query.rocket_name
  }
  if (req.query.rocket_type) {
    query["rocket.rocket_type"] = req.query.rocket_type
  }
  if (req.query.core_serial) {
    query.core_serial = req.query.core_serial
  }
  if (req.query.cap_serial) {
    query.cap_serial = req.query.cap_serial
  }
  if (req.query.core_reuse) {
    query["reuse.core"] = req.query.core_reuse
  }
  if (req.query.side_core1_reuse) {
    query["reuse.side_core1"] = req.query.side_core1_reuse
  }
  if (req.query.side_core2_reuse) {
    query["reuse.side_core2"] = req.query.side_core2_reuse
  }
  if (req.query.fairings_reuse) {
    query["reuse.fairings"] = req.query.fairings_reuse
  }
  if (req.query.capsule_reuse) {
    query["reuse.capsule"] = req.query.capsule_reuse
  }
  if (req.query.launch_success) {
    query.launch_success = req.query.launch_success
  }
  if (req.query.reused) {
    query.reused = req.query.reused
  }
  if (req.query.land_success) {
    query.land_success = req.query.land_success
  }
  if (req.query.landing_type) {
    query.landing_type = req.query.landing_type
  }
  if (req.query.landing_vehicle) {
    query.landing_vehicle = req.query.landing_vehicle
  }
  return query
}
