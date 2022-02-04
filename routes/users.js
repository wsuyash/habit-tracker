const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Habit = require('../models/Habit');

router.get('/login', (req, res) => {
  res.render('login', {
		email: '',
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
		firstName: '',
		lastName: '',
		email: '',
  });
});


router.post('/new-user', async (req, res) => {

  let { firstName, lastName, email, password, confirmPassword } = req.body;

  // TODO: Add flash message
  if (password !== confirmPassword) {
    console.log('Password mismatch');
    return res.render('register', {
      firstName, lastName, email
    });
  }

  let user = await User.findOne({email}).then(user => { return user; });

	if (user) {
		console.log('Email already exists.');
		// return res.redirect('login');
		return res.render('login', {
			email
		});
	} else {
		// create a new user document in db
		let newUser = new User({
			firstName,
			lastName,
			email,
			password
		});

		await newUser.save();

		// return res.redirect('/users/login');
		return res.render('login', {
			email
		});
	}

});

router.post('/new-session', async (req, res) => {
  let { email, password } = req.body;
 
	let user = await User.findOne({email}).then(user => { return user; });

	if (user === null) {
  // TODO: Add flash message
		console.log('email or password incorrect.');
		return res.redirect('/');
	}

	if (user.password !== password) {
  // TODO: Add flash message
		console.log('email or password incorrect.');
		return res.render('login', {
			email	
		});
	}

  // TODO: Add flash message
  return res.render('dashboard', {
  	user
   });
});

module.exports = router;
