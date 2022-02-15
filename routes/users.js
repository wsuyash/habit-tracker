const router = require('express').Router();

const usersController = require('../controllers/users_controller');

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.post('/create-session', usersController.createSession);
router.post('/create-user', usersController.createUser);
router.post('/change-view', usersController.changeView);

module.exports = router;