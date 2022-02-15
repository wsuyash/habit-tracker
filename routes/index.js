// Imports
const express = require('express'); // Import express
const router = express.Router(); // Create a new router

const homeController = require('../controllers/home_controller'); // Import the home controller 

// Routes
router.get('/' , homeController.home); // Get the home page
router.use('/users', require('./users')); // Use the users routes
router.use('/dashboard', require('./dashboard')); // Use the dashboard routes
router.use('/habits', require('./habits')); // Use the habits routes

module.exports = router;
