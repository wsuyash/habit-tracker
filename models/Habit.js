const mongoose = require('mongoose');

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

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
