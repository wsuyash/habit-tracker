const express = require('express');
const router = express.Router();

const habitsController = require('../controllers/habits_controller');

router.post('/new', habitsController.newHabit);
router.post('/delete', habitsController.deleteHabit);
router.post('/status', habitsController.changeStatus);

module.exports = router;