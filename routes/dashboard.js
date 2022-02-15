const router = require('express').Router();

const dashboardController = require('../controllers/dashboard_controller');

router.get('/:id', dashboardController.getHabits);

module.exports = router;