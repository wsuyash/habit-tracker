const User = require('../models/User'); // Import the User model

// Render the login page
module.exports.login = (req, res) => {
	return res.render('login', {
		email: '',
	});
}

// Render the register page
module.exports.register = (req, res) => {
	return res.render('register', {
		firstName: '',
		lastName: '',
		email: '',
	});
}

// Login a user to create a session
module.exports.createSession = async (req, res) => {
	const { email, password } = req.body; // Get email and password from the form

	try {
		let user = await User.findOne({email: email}); // Find the user with the email

		let errors = []; // Create an errors array

		// If the user doesn't exist or the password is incorrect, redirect to the login page
		if (!user || password !== user.password) {
			// Add an error message to the errors array
			errors.push({ msg: 'Invalid email or password.' });
			// Render the login page with the errors array
			return res.render('login', {
				email: '',
				errors
			});
		}

		return res.redirect(`/dashboard/${user._id}`);
	} catch (error) {
		console.error(error);
		return res.redirect('back');
	}
}

// Register a user
module.exports.createUser = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body; // Get the user's first name, last name, email, password, and confirm password from the form

	let errors = []; // Create an errors array

	// If the password and confirm password don't match, redirect to the register page
	if (password !== confirmPassword) {
		// Add an error message to the errors array
		errors.push({ msg: 'Passwords do not match.' });
		return res.render('register', {
			firstName,
			lastName,
			email,
			errors
		});
	}

	try {
		let user = await User.findOne({ email: email }); // Find the user with the email	

		// If the user already exists, redirect to the login page
		if (user) {
			// Add an error message to the errors array
			errors.push({ msg: 'Email is already in use.\nLogin to continue.' });
			// Render the login page with the errors array
			return res.render('login', {
				email,
				errors
			});
		}

		// Create the new user document
		let newUser = await new User({
			firstName,
			lastName,
			email,
			password
		});

		// Save the new user document in the database
		await newUser.save();

		// Redirect to the login page
		return res.render('login', {
			email
		});

	} catch (error) {
		console.error(error);	
		return res.redirect('back');
	}
} 

// Toggle views for the user
module.exports.changeView = async (req, res) => {
	try {
		let userId = req.query.userId; // Get the user id from the query string
		let view = req.query.view; // Get the current view from the query string

		let user = await User.findById(userId); // Find the user with the userId

		// If the user exists, change the view
		if (user) {

			// Toggle the view
			if (view === 'daily') {
				user.view = 'daily';
			} else {
				user.view = 'weekly';
			}

			// Save the user document
			user.save();
		}
			
		return res.redirect(`/dashboard/${userId}`);
	} catch (error) {
		console.error('Error in changing view.');	
		return res.redirect('back');
	}
} 