const router = require('express').Router();
const userController = require('./user-controller');

router.use('/users', userController);

module.exports = router;
