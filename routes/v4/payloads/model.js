const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const payloadSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
    unique: true,
  },
  type: {
    type: String,
    default: null,
  },
  reused: {
    type: Boolean,
    default: false,
  },
  launch: {
    type: mongoose.ObjectId,
    ref: 'Launch',
    default: null,
  },
  customers: [String],
  norad_ids: [Number],
  nationalities: [String],
  manufacturers: [String],
  mass_kg: {
    type: Number,
    default: null,
  },
  mass_lbs: {
    type: Number,
    default: null,
  },
  orbit: {
    type: String,
    default: null,
  },
  reference_system: {
    type: String,
    default: null,
  },
  regime: {
    type: String,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  semi_major_axis_km: {
    type: Number,
    default: null,
  },
  eccentricity: {
    type: Number,
    default: null,
  },
  periapsis_km: {
    type: Number,
    default: null,
  },
  apoapsis_km: {
    type: Number,
    default: null,
  },
  inclination_deg: {
    type: Number,
    default: null,
  },
  period_min: {
    type: Number,
    default: null,
  },
  lifespan_years: {
    type: Number,
    default: null,
  },
  epoch: {
    type: String,
    default: null,
  },
  mean_motion: {
    type: Number,
    default: null,
  },
  raan: {
    type: Number,
    default: null,
  },
  arg_of_pericenter: {
    type: Number,
    default: null,
  },
  mean_anomaly: {
    type: Number,
    default: null,
  },
  dragon: {
    capsule: {
      type: mongoose.ObjectId,
      ref: 'Capsule',
      default: null,
    },
    mass_returned_kg: {
      type: Number,
      default: null,
    },
    mass_returned_lbs: {
      type: Number,
      default: null,
    },
    flight_time_sec: {
      type: Number,
      default: null,
    },
    manifest: {
      type: String,
      default: null,
    },
    water_landing: {
      type: Boolean,
      default: null,
    },
    land_landing: {
      type: Boolean,
      default: null,
    },
  },
}, { autoCreate: true });

const index = {
  name: 'text',
};
payloadSchema.index(index);

payloadSchema.plugin(mongoosePaginate);
payloadSchema.plugin(idPlugin);

const Payload = mongoose.model('Payload', payloadSchema);

module.exports = Payload;
