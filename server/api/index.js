const router = require('express').Router();
const userController = require('./user-controller');
const habitController = require('./habit-controller');
const analyticsController = require('./analytics-controller');

router.use('/users', userController);
router.use('/habits', habitController);
router.use('/analytics', analyticsController)

module.exports = router;
