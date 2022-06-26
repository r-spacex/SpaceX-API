import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import idPlugin from 'mongoose-id';

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

export default User;
