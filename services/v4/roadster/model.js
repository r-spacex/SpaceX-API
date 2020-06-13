const mongoose = require('mongoose');
const idPlugin = require('mongoose-id');

const roadsterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  launch_date_utc: {
    type: String,
  },
  launch_date_unix: {
    type: Number,
  },
  launch_mass_kg: {
    type: Number,
  },
  launch_mass_lbs: {
    type: Number,
  },
  norad_id: {
    type: Number,
  },
  epoch_jd: {
    type: Number,
  },
  orbit_type: {
    type: String,
  },
  apoapsis_au: {
    type: Number,
  },
  periapsis_au: {
    type: Number,
  },
  semi_major_axis_au: {
    type: Number,
  },
  eccentricity: {
    type: Number,
  },
  inclination: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  periapsis_arg: {
    type: Number,
  },
  period_days: {
    type: Number,
  },
  speed_kph: {
    type: Number,
  },
  speed_mph: {
    type: Number,
  },
  earth_distance_km: {
    type: Number,
  },
  earth_distance_mi: {
    type: Number,
  },
  mars_distance_km: {
    type: Number,
  },
  mars_distance_mi: {
    type: Number,
  },
  flickr_images: [String],
  wikipedia: {
    type: String,
  },
  video: {
    type: String,
  },
  details: {
    type: String,
  },
}, { autoCreate: true });

roadsterSchema.plugin(idPlugin);

const Roadster = mongoose.model('Roadster', roadsterSchema);

module.exports = Roadster;
