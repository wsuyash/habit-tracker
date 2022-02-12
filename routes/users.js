const router = require('express').Router();

router.get('/login', (req, res) => {
	return res.render('login');
});

router.get('/register', (req, res) => {
	return res.render('register');
});

module.exports = router;