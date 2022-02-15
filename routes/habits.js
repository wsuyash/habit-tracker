const express = require('express'); // Import the express module
const router = express.Router(); // Create a router object

const habitsController = require('../controllers/habits_controller'); // Import the habits controller

// Routes
router.post('/new', habitsController.newHabit); // Create a new habit
router.post('/delete', habitsController.deleteHabit); // Delete a habit
router.post('/status', habitsController.changeStatus); // Toggle a habit status

module.exports = router; // Export the router object