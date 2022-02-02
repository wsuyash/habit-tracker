const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('login', {
		title: "Habit Tracker - Login",
	});
});

router.get('/register', (req, res) => {
	res.render('register', {
		title: "Habit Tracker - Register",
	});
});

router.post('/register', (req, res) => {
	console.log(req.body);
	res.redirect('back');
});

module.exports = router;