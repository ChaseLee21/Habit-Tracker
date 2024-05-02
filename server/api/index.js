const { authMiddleware } = require('../utils/auth');
const router = require('express').Router();
const userController = require('./user-controller');
const habitController = require('./habit-controller');
const analyticsController = require('./analytics-controller');
const auth = require('../utils/auth');
const { User } = require('../models');

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
        user = user.toObject();
        delete user.salt;
        delete user.password;
        console.log('user found in login route, signing token and setting cookie');
        const token = auth.signToken(user);
        res.cookie('habitTrackerToken', token, { secure: false, sameSite: 'none', path: '/', domain: 'localhost'});
        console.log('cookie set');
        console.log('sending response');
        res.json({ user });
    });
});

router.use('/checkToken', authMiddleware, async (req, res) => {
    console.log('checkToken');
    res.json({ user: req.user });
});


router.use('/users', userController);
router.use('/habits', habitController);
router.use('/analytics', analyticsController)

module.exports = router;
