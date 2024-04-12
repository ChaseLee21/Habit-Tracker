const { User } = require('../models/index');
const router = require('express').Router();

// GET all users (for testing)
router.get('/', (req, res) => {
    User.find({})
        .then((users) => {
            if (!users || users.length === 0) {
                res.status(404).json({ message: 'No users were found' });
                return;
            }
            res.json(users);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// GET one user by id => populate habits => populate analytics => create new analytics if one is not found for today's date
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    try {
        const user = await User.findOne({ _id: id }).populate({
            path: 'habits', 
            populate: {
                path: 'analytics',
                model: 'Analytics',
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id' });
        }
        if (user.habits.length === 0) {
            return res.status(404).json({ message: 'No habits found for this user' });
        }
        const promises = user.habits.map(async (habit) => {
            const todaysAnalytic = habit.analytics.find(analytic => analytic.date.getTime() === currentDate.getTime());
            if (!todaysAnalytic) {
                const yesterdaysAnalytic = habit.analytics.find(analytic => analytic.date.getTime() === yesterday.getTime());
                let newAnalytic = {
                    user: id,
                    habit: habit._id,
                    date: currentDate,
                    completed: false,
                    streak: 0
                };
                if (yesterdaysAnalytic && yesterdaysAnalytic.streak > 0 && yesterdaysAnalytic.completed) {
                    newAnalytic.streak = yesterdaysAnalytic.streak;
                    newAnalytic.yesterdayStreak = yesterdaysAnalytic.streak;
                }
                const analytic = await Analytics.create(newAnalytic);
                habit.analytics.push(analytic._id);
            }
        });
        await Promise.all(promises);
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/', (req, res) => {
    const userData = req.body;
    User.create(userData)
        .then((user) => {
            user = user.toObject();
            delete user.password;
            delete user.salt;
            res.status(201).json({ message: 'User created successfully', user: user });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
})

// PUT updated user by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    User.findOneAndUpdate({ _id: id }, { $set: userData })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.status(200).json({ message: 'User updated successfully', user: user});
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

// DELETE user by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.findOneAndDelete({ _id: id })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;