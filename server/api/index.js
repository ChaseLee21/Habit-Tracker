const { authMiddleware } = require('../utils/auth');
const router = require('express').Router();
const userController = require('./user-controller');
const habitController = require('./habit-controller');
const analyticsController = require('./analytics-controller');
const auth = require('../utils/auth');
const { User } = require('../models');

router.use('/checkToken', authMiddleware, async (req, res) => {
    const token = req.cookies.habitTrackerToken;
    const verifiedToken = auth.verifyToken(token);
    if (verifiedToken) {
        console.log(verifiedToken);
        let user = await User.findById(verifiedToken.id);
        user = user.toObject();
        delete user.salt;
        delete user.password;
        res.json({ user: user });
    }
    else {
        res.status(401).json({ message: 'Invalid token' });
    }
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
        user = user.toObject();
        delete user.salt;
        delete user.password;
        const token = auth.signToken(user._id, user.email, user.name);
        res.cookie('habitTrackerToken', token, { httpOnly: true });
        res.json({ user });
    });
});

router.use('/users', userController);
router.use('/habits', habitController);
router.use('/analytics', analyticsController)

module.exports = router;
