import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idPlugin from 'mongoose-id';

const historySchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  event_date_utc: {
    type: String,
    default: null,
  },
  event_date_unix: {
    type: Number,
    default: null,
  },
  details: {
    type: String,
    default: null,
  },
  links: {
    article: {
      type: String,
      default: null,
    },
  },
}, { autoCreate: true });

const index = {
  title: 'text',
  details: 'text',
};
historySchema.index(index);

historySchema.plugin(mongoosePaginate);
historySchema.plugin(idPlugin);

const History = mongoose.model('History', historySchema);

export default History;
