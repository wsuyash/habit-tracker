const router = require('express').Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
	try {
		let habits = await Habit.find({});

		for (let i = 0; i < habits.length; i++) {
			// number of days since habit was created
			let numberOfDays = Math.round((new Date() - habits[i].createdAt) / (1000*60*60*24));

			if (numberOfDays > 0) {
				let newDates = [];
				newDates = habits[i].dates.splice(numberOfDays);

				for (let j = numberOfDays - 1; j >= 0; j--) {
					let newDate = new Date(new Date().setDate(new Date().getDate() - j));
					newDates.push({Date: newDate, Status: 'None'});
				}
				habits[i].dates = newDates;

				await habits[i].save();
			}
		}

		return res.render('dashboard', {
			habits,
			view: 'weekly',
		});
	} catch (error) {
		console.log(error);	
	}
});

module.exports = router;