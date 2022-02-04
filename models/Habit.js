const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dates: [{
    type: Date, 
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
