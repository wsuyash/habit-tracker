const router = require('express').Router();
const db = require('../config/mongoose');
const User = require('../models/User');
const Habit = require('../models/Habit');

router.get('/:id', async (req, res) => {
	try {
		let user = await User.findById(req.params.id);

		let habits = user.habits;
		console.log(habits);
		// for (let i = 0; i < habits.length; i++) {

		// 	if (habits[i].dates[6].Date.toDateString('en-IN') !== new Date().toDateString('en-In')) {
		// 		// number of days since habit was created
		// 		let numberOfDays = Math.round((new Date() - habits[i].createdAt) / (1000*60*60*24));

		// 		if (numberOfDays > 0) {
		// 			habits[i].dates.splice(numberOfDays);

		// 			for (let j = numberOfDays - 1; j >= 0; j--) {
		// 				let newDate = new Date(new Date().setDate(new Date().getDate() - j));
		// 				habits[i].dates.push({Date: newDate, Status: 'None'});
		// 			}

		// 			await habits[i].save();
		// 		}
		// 	}
		// }

		return res.render('dashboard', {
			user,
			view: 'weekly',
		});
		return res.redirect('back');
	} catch (error) {
		console.log(error);	
	}
});

module.exports = router;