const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const fairingSchema = new mongoose.Schema({
  serial: {
    type: String,
    unique: true,
    required: true,
  },
  version: {
    type: String,
    enum: ['1.0', '2.0', '2.5'],
    required: true,
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
  net_landing_attempts: {
    type: Number,
    default: 0,
  },
  net_landing: {
    type: Number,
    default: 0,
  },
  water_landing_attempts: {
    type: Number,
    default: 0,
  },
  water_landing: {
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

fairingSchema.plugin(mongoosePaginate);
fairingSchema.plugin(idPlugin);

const Fairing = mongoose.model('Fairing', fairingSchema);

module.exports = Fairing;
