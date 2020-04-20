
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
    enum: ['active', 'inactive', 'unknown', 'retired', 'lost'],
    required: true,
  },
  timezone: {
    type: String,
    default: null,
  },
  locality: {
    type: String,
    default: null,
  },
  region: {
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
  launches: [{
    type: mongoose.ObjectId,
    ref: 'Launch',
  }],
});

launchpadSchema.plugin(mongoosePaginate);
launchpadSchema.plugin(idPlugin);

const Launchpad = mongoose.model('Launchpad', launchpadSchema);

module.exports = Launchpad;
