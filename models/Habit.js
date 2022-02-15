const mongoose = require('mongoose'); // Import mongoose

// Define the Habit schema
const HabitSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  dates: [{
    Date: {
      type: Date,
    },
    Status: {
      type: String, 
			default: 'None',
			enum: ['None', 'Done', 'Not Done'],
    },
  }],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
},
{
  timestamps: true,
});

// Create the Habit model
const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit; // Export the Habit model
