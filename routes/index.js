const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');

router.get('/' , (req, res) => {
	return res.render('home');
});

router.use('/users', require('./users'));
router.use('/dashboard', require('./dashboard'));
router.use('/habits', require('./habits'));

module.exports = router;
