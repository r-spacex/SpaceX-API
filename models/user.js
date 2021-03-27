const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  key: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['superuser', 'user', 'create', 'update', 'delete'],
  },
}, { autoCreate: true });

userSchema.plugin(mongoosePaginate);
userSchema.plugin(idPlugin);

const User = mongoose.model('User', userSchema);

module.exports = User;
