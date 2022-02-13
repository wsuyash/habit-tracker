const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.post('/new', async (req, res) => {
	const { desc } = req.body;

	let userId = req.query.id;

	try {
		let oldHabit = await Habit.findOne({user: userId, desc: desc});

		if (oldHabit) {
			console.log('Habit exists');
			return res.redirect('back');
		}

		const dates = []; 

		for (let i = 6; i > 0; i--) {
			let newDate = new Date(new Date().setDate(new Date().getDate() - i));
			dates.push({Date: newDate, Status: 'None'});
		}

		dates.push({Date: new Date(), Status: 'None'});

		let newHabit = await new Habit({
			desc,
			dates,
			user: userId,
		});

		await newHabit.save();

	} catch (error) {
		console.error(error);
	}

	return res.redirect(`/dashboard/${userId}`);
});

router.post('/delete', async (req, res) => {
	try {

		let userId = req.query.userId;
		let habitId = req.query.habitId;

		let habit = await Habit.findById({user: userId, _id: habitId});	

		if (habit) {
			await habit.remove();
			return res.redirect(`/dashboard/${userId}`);
		}

	} catch (error) {
		console.log(error);
		return res.redirect('back');
	}
});

router.post('/status', async (req, res) => {
	try {
		let userId = req.query.userId;
		let habitId = req.query.habitId;
		let dateId = req.query.dateId;

		let habit = await Habit.findById({user: userId, _id: req.query.habitId});	

		if (habit) {
			let dates = habit.dates;

			let date = dates.find((date) => {
				return date._id == dateId;
			});

			let index = dates.indexOf(date);

			if (dates[index].Status === 'None') {
				dates[index].Status = 'Done';
			} else if (dates[index].Status === 'Done') {
				dates[index].Status = 'Not Done';
			} else {
				dates[index].Status = 'None';
			}
			
			await Habit.updateOne({_id: habitId}, {dates});
			
			return res.redirect(`/dashboard/${userId}`);
		}

	} catch (error) {
		console.log(error);	
		return res.redirect('back');
	}
});

module.exports = router;