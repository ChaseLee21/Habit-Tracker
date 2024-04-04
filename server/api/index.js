const router = require('express').Router();
const userController = require('./user-controller');
const habitController = require('./habit-controller');

router.use('/users', userController);
router.use('/habits', habitController);

module.exports = router;
