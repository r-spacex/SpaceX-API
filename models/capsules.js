import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idPlugin from 'mongoose-id';

const capsuleSchema = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['unknown', 'active', 'retired', 'destroyed'],
    required: true,
  },
  type: {
    type: String,
    enum: ['Dragon 1.0', 'Dragon 1.1', 'Dragon 2.0'],
    required: true,
  },
  dragon: {
    type: mongoose.ObjectId,
    ref: 'Dragon',
  },
  reuse_count: {
    type: Number,
    default: 0,
  },
  water_landings: {
    type: Number,
    default: 0,
  },
  land_landings: {
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

const index = {
  serial: 'text',
  last_update: 'text',
};
capsuleSchema.index(index);

capsuleSchema.plugin(mongoosePaginate);
capsuleSchema.plugin(idPlugin);

const Capsule = mongoose.model('Capsule', capsuleSchema);

export default Capsule;
