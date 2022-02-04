const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  habits: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Habit'
  }],
},
{
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
