const router = require('express').Router();
const db = require('../config/mongoose');
const User = require('../models/User');

router.get('/login', (req, res) => {
	return res.render('login');
});

router.get('/register', (req, res) => {
	return res.render('register');
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({email: email});	

		if (!user || password !== user.password) {
			return res.redirect('back');
		}

		return res.redirect(`/dashboard/${user._id}`);
	} catch (error) {
		console.error(error);
		return res.redirect('back');
	}
});

router.post('/register', async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		console.log('Passwords do not match.');
		return res.redirect('back');
	}

	try {
		let user = await User.findOne({ email: email });	

		if (user) {
			return res.redirect('login');
		}

		let newUser = await new User({
			firstName,
			lastName,
			email,
			password
		});

		await newUser.save();

		return res.redirect('login');

	} catch (error) {
		console.error(error);	
		return res.redirect('back');
	}
});

router.post('/change-view', async (req, res) => {
	try {
		let userId = req.query.userId;
		let view = req.query.view;

		let user = await User.findById(userId);

		if (user) {

			if (view === 'daily') {
				user.view = 'daily';
			} else {
				user.view = 'weekly';
			}
			user.save();
		} else {
			console.error('Error getting the user.');
		}
			
		return res.redirect(`/dashboard/${userId}`);
	} catch (error) {
		console.error('Error in changing view.');	
		return res.redirect('back');
	}
});

module.exports = router;