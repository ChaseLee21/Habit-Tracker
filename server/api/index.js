const { authMiddleware } = require('../utils/auth');
const router = require('express').Router();
const userController = require('./user-controller');
const habitController = require('./habit-controller');
const analyticsController = require('./analytics-controller');

router.use('/checkToken', authMiddleware, (req, res) => {
    console.log('checkToken route hit');
    console.log(req.user);
    res.json({ user: req.user });
});

router.use('/users', userController);
router.use('/habits', habitController);
router.use('/analytics', analyticsController)

module.exports = router;
