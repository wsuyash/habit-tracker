const User = require('../models/User'); // Import the User model
const Habit = require('../models/Habit'); // Import the Habit model

// Get the habits of a user
module.exports.getHabits = async (req, res) => {
	try {
		let id = req.params.id; // id of user
		let user = await User.findById(id); // find user by id
		let habits = await Habit.find({user: id}); // find all habits of user

		// Generate dates or get the available dates from the database
		for (let i = 0; i < habits.length; i++) {

			if (habits[i].dates[6].Date.toDateString() !== new Date().toDateString()) {
				// number of days since habit was created
				let numberOfDays = Math.round((new Date() - habits[i].createdAt) / (1000*60*60*24));

				if (numberOfDays > 0) {

					// this is to ensure that the new dates are generated for the last 6 days
					if (numberOfDays > 7) {
						numberOfDays = 7;
					}

					// remove old dates
					habits[i].dates = habits[i].dates.splice(numberOfDays);

					// push new dates to the database
					for (let j = numberOfDays - 1; j >= 0; j--) {
						let newDate = new Date(new Date().setDate(new Date().getDate() - j));
						habits[i].dates.push({Date: newDate, Status: 'None'});
					}
					await habits[i].save();
				}
			}
		}

		return res.render('dashboard', {
			userName: user.firstName,
			userId: id,
			view: user.view,
			habits,
		});
	} catch (error) {
		console.error(error);	
		return res.redirect('back');
	}
}