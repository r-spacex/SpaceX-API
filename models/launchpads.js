import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idPlugin from 'mongoose-id';

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
  details: {
    type: String,
    default: null,
  },
  images: {
    large: [String],
  },
}, { autoCreate: true });

const index = {
  name: 'text',
  full_name: 'text',
  details: 'text',
};
launchpadSchema.index(index);

launchpadSchema.plugin(mongoosePaginate);
launchpadSchema.plugin(idPlugin);

const Launchpad = mongoose.model('Launchpad', launchpadSchema);

export default Launchpad;
