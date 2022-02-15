const mongoose = require('mongoose'); // Import mongoose

// Define the User schema
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
	view: {
		type: String,
		default: 'daily',
		enum: ['daily', 'weekly'],
	}
},
{
  timestamps: true,
});

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User; // Export the User model
