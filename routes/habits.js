const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const User = require('../models/User');
const Habit = require('../models/Habit');

router.post('/new/:id', async (req, res) => {
	const { desc } = req.body;
	// console.log(req.params.id);

	try {
		let user = await User.findById(req.params.id);
		console.log(user);

		// let oldHabit = Habit.find({ user: user._id, desc: desc});

		// if (oldHabit) {
		// 	console.log('Habit already exists.');
		// 	return res.redirect('back');
		// }

		const dates = []; 

		for (let i = 6; i > 0; i--) {
			let newDate = new Date(new Date().setDate(new Date().getDate() - i));
			dates.push({Date: newDate, Status: 'None'});
		}

		dates.push({Date: new Date(), Status: 'None'});

		let newHabit = await new Habit({
			desc,
			dates,
			user: req.params.id,
		});

		// console.log(newHabit);

		await newHabit.save();

		let habit = await Habit.find({user: req.params.id}).sort({createdAt: -1});
		console.log(habit);

		console.log('habit id:', habit[0]._id);

		// console.log(user.habits);

		await user.habits.push(habit[0]._id);
		await user.save();

		console.log(user.habits);

	} catch (error) {
		console.error(error);
	}

	return res.redirect(`/dashboard/${req.params.id}`);
});

router.post('/delete/:id', async (req, res) => {

	try {
		let habit = await Habit.findById(req.params.id);	

		if (habit) {
			habit.remove();
		}

	} catch (error) {
		console.log(error);
	}

	return res.redirect(`/dashboard/${req.params.id}`);
});

router.post('/status', async (req, res) => {
	try {
		let habit = await Habit.findById( {_id: req.query.habitId} );	

		if (habit) {
			let dates = habit.dates;

			let date = dates.find((date) => {
				return date._id == req.query.dateId;
			});

			let index = dates.indexOf(date);

			if (dates[index].Status === 'None') {
				dates[index].Status = 'Done';
			} else if (dates[index].Status === 'Done') {
				dates[index].Status = 'Not Done';
			} else {
				dates[index].Status = 'None';
			}
			
			await Habit.updateOne({_id: req.query.habitId}, {dates});
		}

	} catch (error) {
		console.log(error);	
	}

	return res.redirect('/dashboard');
		
});

module.exports = router;