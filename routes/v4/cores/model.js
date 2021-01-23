const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const coreSchema = new mongoose.Schema({
  serial: {
    type: String,
    unique: true,
    required: true,
  },
  block: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'unknown', 'expended', 'lost', 'retired'],
    required: true,
  },
  reuse_count: {
    type: Number,
    default: 0,
  },
  rtls_attempts: {
    type: Number,
    default: 0,
  },
  rtls_landings: {
    type: Number,
    default: 0,
  },
  asds_attempts: {
    type: Number,
    default: 0,
  },
  asds_landings: {
    type: Number,
    default: 0,
  },
  last_update: {
    type: String,
    default: null,
  },
  launches: [{
    type: mongoose.ObjectId,
    ref: 'Launch',
  }],
}, { autoCreate: true });

coreSchema.plugin(mongoosePaginate);
coreSchema.plugin(idPlugin);

const Core = mongoose.model('Core', coreSchema);

module.exports = Core;
