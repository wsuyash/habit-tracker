// Imports
const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Habit = require('../models/Habit');
const homeController = require('../controllers/home_controller');

// Routes
router.get('/' , homeController.home);

router.use('/users', require('./users'));
router.use('/dashboard', require('./dashboard'));
router.use('/habits', require('./habits'));

module.exports = router;
