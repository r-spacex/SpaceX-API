
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const coreSchema = new mongoose.Schema({
  serial: {
    type: String,
    default: null,
    required: true,
  },
  block: {
    type: Number,
    default: null,
    required: true,
  },
  status: {
    type: String,
    default: null,
    required: true,
    enum: ['active', 'inactive', 'unknown', 'expended', 'lost'],
  },
  reuse_count: {
    type: Number,
    default: 0,
    required: true,
  },
  rtls_attempts: {
    type: Number,
    default: 0,
    required: true,
  },
  rtls_landings: {
    type: Number,
    default: 0,
    required: true,
  },
  asds_attempts: {
    type: Number,
    default: 0,
    required: true,
  },
  asds_landings: {
    type: Number,
    default: 0,
    required: true,
  },
  last_update: {
    type: String,
    default: null,
    required: true,
  },
});

coreSchema.plugin(mongoosePaginate);

const Core = mongoose.model('Core', coreSchema);

module.exports = Core;
