const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const launchpadSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  full_name: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'unknown', 'retired', 'lost', 'under construction'],
    required: true,
  },
  locality: {
    type: String,
    default: null,
  },
  region: {
    type: String,
    default: null,
  },
  timezone: {
    type: String,
    default: null,
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  launch_attempts: {
    type: Number,
    default: 0,
  },
  launch_successes: {
    type: Number,
    default: 0,
  },
  rockets: [{
    type: mongoose.ObjectId,
    ref: 'Rocket',
  }],
  launches: [{
    type: mongoose.ObjectId,
    ref: 'Launch',
  }],
}, { autoCreate: true });

launchpadSchema.plugin(mongoosePaginate);
launchpadSchema.plugin(idPlugin);

const Launchpad = mongoose.model('Launchpad', launchpadSchema);

module.exports = Launchpad;
