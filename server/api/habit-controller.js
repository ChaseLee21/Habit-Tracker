const router = require('express').Router();
const { Habit, User, Analytics } = require('../models/index');

// GET all habits
router.get('/', (req, res) => {
    Habit.find({ })
        .then((habits) => {
            if (!habits || habits.length === 0) {
                res.status(404).json({ message: 'No habits were found' });
                return;
            }
            res.json(habits);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// GET all habits for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    Habit.find({ user: userId })
        .then((habits) => {
            if (!habits || habits.length === 0) {
                res.status(404).json({ message: 'No habits were found' });
                return;
            }
            res.json(habits);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// POST a new habit
router.post('/:userId', (req, res) => {
    const habitData = req.body;
    const userId = req.params.userId;
    // Create a new habit
    Habit.create(habitData)
        .then((habit) => {
            // Add the habit _id to the user's habits array
            User.findOneAndUpdate({ _id: userId }, { $push: { habits: habit._id } })
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: 'No user found with this id' });
                        return;
                    }
                    res.status(201).json({ message: 'Habit created successfully', habit: habit });
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// PUT updated habit by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const habitData = req.body;
    Habit.findOneAndUpdate({ _id: id }, { $set: habitData })
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' });
                return;
            }
            res.status(200).json({ message: 'Habit updated successfully', habit: habit});
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// PUT calculate habit streak by id
router.put('/streak/:id', (req, res) => {
    const habitId = req.params.id;
    // get the habit by id
    Habit.findOne({ _id: habitId})
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' });
                return;
            }
            // get the analytics for the habit
            Analytics.find({ habit: habitId })
                .then((analytics) => {
                    // sort the analytics by date
                    analytics.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    });
                    let longestStreak = 0;
                    let currentStreak = 0;
                    let previousDate = new Date(analytics[0].date);
                    let currentDate = new Date();
                    let streakStarted = false;
                    // loop through the analytics and calculate the streak
                    for (let i = 0; i < analytics.length; i++) {
                        currentDate = new Date(analytics[i].date);
                        const timeDiff = Math.abs(currentDate.getTime() - previousDate.getTime());
                        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if (diffDays === 1) {
                            if (!streakStarted) {
                                streakStarted = true;
                                currentStreak = 1;
                            } else {
                                currentStreak++;
                                if (currentStreak > longestStreak) {
                                    longestStreak = currentStreak;
                                }
                            }
                        } else {
                            if (currentStreak > longestStreak) {
                                longestStreak = currentStreak;
                            }
                            streakStarted = false;
                            currentStreak = 0;
                        }
                        previousDate = currentDate;
                    }
                    // update the habit with the new streak
                    Habit.findOneAndUpdate({ _id: habitId }, { $set: { streak: currentStreak, longestStreak: longestStreak } })
                        // return the updated habit
                        .then((updatedHabit) => {
                            res.status(200).json({ message: 'Habit streak updated successfully', habit: updatedHabit });
                        })
                        .catch((err) => {
                            res.status(400).json(err);
                        });
                })
        })
});

// DELETE a habit by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Habit.findOneAndDelete({ _id: id })
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' });
                return;
            }
            User.findOneAndUpdate({ habits: id }, { $pull: { habits: id } })
                .then((user) => {
                    if (!user) {
                        console.log('A habit was deleted but no user was not found with the habit id');
                    }
                    res.status(200).json({ message: 'Habit deleted successfully', habit: habit});
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;