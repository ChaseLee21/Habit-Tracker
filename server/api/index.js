const router = require('express').Router();
const userController = require('./userController');

router.use('/users', userRoutes);

module.exports = router;
