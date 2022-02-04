const router = require('express').Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
  let habits;
  try {
    habits = await Habit.find({});
  } catch(err) {
    console.log(err);
  }
  res.render('dashboard', {
    title: 'Habit Tracker - Dashboard',
    habits,
  });
});

module.exports = router;
