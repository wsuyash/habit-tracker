const router = require('express').Router();
const db = require('../config/mongoose');
const User = require('../models/User');
const Habit = require('../models/Habit');

router.get('/:id', async (req, res) => {
	try {
		let id = req.params.id
		let user = await User.findById(id);
		let habits = await Habit.find({user: id});

		for (let i = 0; i < habits.length; i++) {

			if (habits[i].dates[6].Date.toDateString() !== new Date().toDateString()) {
				// number of days since habit was created
				let numberOfDays = Math.round((new Date() - habits[i].createdAt) / (1000*60*60*24));

				if (numberOfDays > 0) {
					if (numberOfDays > 7) {
						numberOfDays = 7;
					}
					habits[i].dates = habits[i].dates.splice(numberOfDays);

					for (let j = numberOfDays - 1; j >= 0; j--) {
						let newDate = new Date(new Date().setDate(new Date().getDate() - j));
						habits[i].dates.push({Date: newDate, Status: 'None'});
					}
					await habits[i].save();
				}
			}
		}

		// console.log('before splice: ', habits[0].dates);
		// habits[0].dates = habits[0].dates.splice(2);
		// console.log('after splice: ', habits[0].dates);
		// habits[0].dates.push({Date: new Date(), Status: 'None'});
		// console.log('after push: ', habits[0].dates);
		// habits[0].save();
		// console.log('after db save: ', habits[0].dates);


		return res.render('dashboard', {
			userName: user.firstName,
			userId: id,
			view: user.view,
			habits,
		});
	} catch (error) {
		console.log(error);	
	}
});

module.exports = router;