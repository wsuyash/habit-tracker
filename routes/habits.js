const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.post('/new', async (req, res) => {
	const { desc } = req.body;

	const dates = []; 

	for (let i = 6; i > 0; i--) {
		let newDate = new Date(new Date().setDate(new Date().getDate() - i));
		dates.push({Date: newDate, Status: 'None'});
	}

	dates.push({Date: new Date(), Status: 'None'});

	const habit = await new Habit({
		desc,
		dates,
	});

	await habit.save();

	return res.redirect('/dashboard');
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

	return res.redirect('/dashboard');
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