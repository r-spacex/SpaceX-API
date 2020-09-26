const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

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

historySchema.plugin(mongoosePaginate);
historySchema.plugin(idPlugin);

const History = mongoose.model('History', historySchema);

module.exports = History;
