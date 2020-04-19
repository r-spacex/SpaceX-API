
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  key: {
    type: String,
    required: true,
  },
  role: [{
    type: String,
    default: 'basic',
    enum: ['basic', 'admin'],
  }],
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
