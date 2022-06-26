import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idPlugin from 'mongoose-id';

const crewSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'retired', 'unknown'],
  },
  agency: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  wikipedia: {
    type: String,
    default: null,
  },
  launches: [{
    type: mongoose.ObjectId,
    ref: 'Launch',
  }],
}, { autoCreate: true });

const index = {
  name: 'text',
};
crewSchema.index(index);

crewSchema.plugin(mongoosePaginate);
crewSchema.plugin(idPlugin);

const Crew = mongoose.model('Crew', crewSchema);

export default Crew;
