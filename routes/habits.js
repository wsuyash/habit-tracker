const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
	res.send('Create a new habit');
});

router.get('/delete', (req, res) => {
	res.send('Delete a habit');
});

module.exports = router;