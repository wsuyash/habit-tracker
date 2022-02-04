const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.use('/users', require('./users'));
router.use('/habits', require('./habits'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;
