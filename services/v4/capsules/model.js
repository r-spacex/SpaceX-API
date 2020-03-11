
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const capsuleSchema = new mongoose.Schema({
  serial: {
    type: String,
    default: null,
    required: true,
  },
  status: {
    type: String,
    default: null,
    required: true,
    enum: ['unknown', 'active', 'retired', 'destroyed'],
  },
  dragon: mongoose.ObjectId,
  reuse_count: {
    type: Number,
    default: 0,
    required: true,
  },
  water_landings: {
    type: Number,
    default: 0,
    required: true,
  },
  land_landings: {
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

capsuleSchema.plugin(mongoosePaginate);

const Capsule = mongoose.model('Capsule', capsuleSchema);

module.exports = Capsule;
