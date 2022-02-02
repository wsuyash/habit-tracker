const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home', {
		title: "Habit Tracker"
	});
});

router.use('/users', require('./users'));
router.use('/habits', require('./habits'));

module.exports = router;