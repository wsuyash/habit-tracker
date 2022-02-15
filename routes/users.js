const router = require('express').Router(); // Import the express router

const usersController = require('../controllers/users_controller'); // Import the users controller

// Routes
router.get('/login', usersController.login); // Get the login page
router.get('/register', usersController.register); // Get the register page
router.post('/create-session', usersController.createSession); // Login a user to create a session
router.post('/create-user', usersController.createUser); // Register a user
router.post('/change-view', usersController.changeView); // Toggle the view of a user

module.exports = router;