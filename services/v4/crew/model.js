
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const crewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

crewSchema.plugin(mongoosePaginate);

const Crew = mongoose.model('Crew', crewSchema);

module.exports = Crew;
