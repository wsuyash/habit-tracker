const router = require('express').Router();
const db = require('../config/mongoose');
const flash = require('connect-flash');
const User = require('../models/User');

router.get('/login', (req, res) => {
	return res.render('login');
});

router.get('/register', (req, res) => {
	return res.render('register');
});

router.post('/login', (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;

	return res.redirect('back');
});

router.post('/register', (req, res) => {
	console.log(req.body);

	const { firstName, lastName, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.redirect('back');
	}

});

module.exports = router;