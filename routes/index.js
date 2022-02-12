const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.get('/', async (req, res) => {

	try {
		let habits = await Habit.find({});

		return res.render('dashboard', {
			habits,
			view: 'weekly',
		});
	} catch (error) {
		console.log(error);	
	}
});

router.use('/habits', require('./habits'));

module.exports = router;
