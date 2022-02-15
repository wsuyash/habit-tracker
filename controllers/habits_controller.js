const Habit = require('../models/Habit'); // Import the Habit model

// Create a new habit
module.exports.newHabit = async (req, res) => {
	const { desc } = req.body; // Get the description from the form

	let userId = req.query.id; // Get the user id from the query string

	try {
		let oldHabit = await Habit.findOne({user: userId, desc: desc}); // Find the habit with the same description

		// If the habit already exists, redirect to the dashboard
		if (oldHabit) {
			console.log('Habit exists');
			return res.redirect('back');
		}

		const dates = []; // Create an empty array for dates

		// Generate dates
		for (let i = 6; i > 0; i--) {
			let newDate = new Date(new Date().setDate(new Date().getDate() - i));
			dates.push({Date: newDate, Status: 'None'});
		}

		// Push todays date to the array
		dates.push({Date: new Date(), Status: 'None'});

		// Create the habit document
		let newHabit = await new Habit({
			desc,
			dates,
			user: userId,
		});

		// Save the habit document in the database
		await newHabit.save();

		return res.redirect(`/dashboard/${userId}`);
	} catch (error) {
		console.error(error);
		return res.redirect('back');
	}
}

// Delete a habit
module.exports.deleteHabit = async (req, res) => {
	try {

		let userId = req.query.userId; // Get the user id from the query string
		let habitId = req.query.habitId; // Get the habit id from the query string

		let habit = await Habit.findById({user: userId, _id: habitId});	// Find the habit of a particula user with userId and the habit using habitId

		// If the habit exists, delete it
		if (habit) {
			await habit.remove();
		}
			
		return res.redirect(`/dashboard/${userId}`);

	} catch (error) {
		console.error(error);
		return res.redirect('back');
	}
}

// Toggle a habit status
module.exports.changeStatus = async (req, res) => {
	try {
		let userId = req.query.userId; // Get the user id from the query string
		let habitId = req.query.habitId; // Get the habit id from the query string
		let dateId = req.query.dateId; // Get the date id from the query string

		let habit = await Habit.findById({user: userId, _id: habitId}); // Find the habit of a particula user with userId and the habit using habitId	

		// If the habit exists,
		if (habit) {
			let dates = habit.dates; // get the dates of that habit

			// Find the date with the dateId
			let date = dates.find((date) => {
				return date._id == dateId;
			});

			// Get the index of the date whose status is to be changed
			let index = dates.indexOf(date);

			// Toggle the status of the date
			if (dates[index].Status === 'None') {
				dates[index].Status = 'Done';
			} else if (dates[index].Status === 'Done') {
				dates[index].Status = 'Not Done';
			} else {
				dates[index].Status = 'None';
			}
			
			// Update the habit document with the new date status
			await Habit.updateOne({_id: habitId}, {dates});
			
			return res.redirect(`/dashboard/${userId}`);
		}

	} catch (error) {
		console.error(error);	
		return res.redirect('back');
	}
}