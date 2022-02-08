const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
	let habits = await Habit.find({});

	let dates = habits.dates;

  res.render('home', {
		habits,
	});
});

router.use('/habits', require('./habits'));

module.exports = router;
