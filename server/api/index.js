const { authMiddleware } = require('../utils/auth');
const router = require('express').Router();
const userController = require('./user-controller');
const habitController = require('./habit-controller');
const analyticsController = require('./analytics-controller');
const { User } = require('../models');

router.use('/checkToken', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

router.use('/login', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            console.log('no user found');
            res.status(401).json({ message: 'No user with that email!' });
            return;
        }
        if (!user.checkPassword(req.body.password, user.salt)) {
            console.log('password incorrect');
            res.status(401).json({ message: 'Wrong password!' });
            return;
        }
        const token = auth.signToken(user._id, user.email, user.name);
        res.json({ token, user });
    });
});

router.use('/users', userController);
router.use('/habits', habitController);
router.use('/analytics', analyticsController)

module.exports = router;
