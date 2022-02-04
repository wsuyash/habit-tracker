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
      type: Boolean, 
    },
  }],
  favourite: {
    type: Boolean,
  },
},
{
  timestamps: true,
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
