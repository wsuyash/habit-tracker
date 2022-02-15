const router = require('express').Router(); // Import the express router

const dashboardController = require('../controllers/dashboard_controller'); // Import the dashboard controller

// Routes
router.get('/:id', dashboardController.getHabits); // Get the habits of a user

module.exports = router; // Export the router