const {Analytics, Habit} = require('../models/index');
const router = require("express").Router();

// GET all analytics for a user 
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    Analytics.find({ user: userId })
        .then((analytics) => {
            if (!analytics || analytics.length === 0) {
                res.status(404).json({message: "No analytics were found"})
                return;
            }
            res.status(200).json(analytics);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "An error has occurred while fetching analytics"});
        })
});

// GET all analytics for a user specific to a date
router.get('/:userId/:date', (req, res) => {
    const userId = req.params.userId;
    const date = req.params.date;
    Habit.find({ user: userId })
        .then((habits) => {
            if (!habits || habits.length === 0) {
                console.log("No habits were found at /api/analytics/:userId/:date", userId, date);
                res.status(404).json({message: "No habits were found"})
                return;
            }
            Analytics.find({ user: userId, date: date})
                .then((analytics) => {
                    if (!analytics || analytics.length === 0) {
                        console.log("No analytics were found at /api/analytics/:userId/:date", userId, date);
                        res.status(404).json({message: "No analytics were found"})
                        return;
                    }
                    for (let i = 0; i < habits.length; i++) {
                        const habit = habits[i];
                        const analytic = analytics.find(analytic => {
                            return analytic.habit.toString() === habit._id.toString();
                        });
                        if (!analytic) {
                            const newAnalytic = {
                                user: userId,
                                habit: habit._id,
                                date: date,
                                completed: false
                            }
                            Analytics.create(newAnalytic)
                                .then((analytic) => {
                                    analytics.push(analytic);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.status(500).json({message: "An error has occurred while creating analytics"});
                                })
                        }
                    }
                    res.status(200).json(analytics);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({message: "An error has occurred while fetching analytics"});
                })
        })
});

//GET one analytic by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Analytics.findById({ _id: id})
        .then((analytic) => {
            if (!analytic) {
                res.status(404).json({message: "No analytic was found with that id"})
                return;
            }
            res.status(200).json(analytic);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "An error has occurred while fetching the analytic"});
        })
});

//POST analytic
router.post('/:habitId', (req, res) => {
    const analyticData = req.body;
    const habitId = req.params.habitId;
    Analytics.create(analyticData)
        .then((analytic) => {
            Habit.findOneAndUpdate({ _id: habitId }, { $push: { analytics: analytic._id } })
                .then((habit) => {
                    if (!habit) {
                        res.status(404).json({message: "No habit was found with that id"});
                        return;
                    }
                    res.status(201).json({message: "analytic successfully created", analytic: analytic});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({message: "An error has occurred while attempting to create the analytic"});
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "An error has occurred while attempting to create the analytic"});
        })
});

//PUT analytic by id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const analyticData = req.body;
    Analytics.findOneAndUpdate({ _id: id }, { $set: analyticData }, { new: true })
        .then((analytic) => {
            if (!analytic) {
                res.status(404).json({message: "No analytic was found with that id"})
                return;
            }
            res.status(200).json({message: "analytic successfully updated", analytic: analytic});
        })
        .catch((err) => {
            console.log(err);
        res.status(500).json({message: "An error has occurred while attempting to update the analytic"});
        })
});

//Delete analytic by id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Analytics.findOneAndDelete({ _id: id })
        .then((analytic) => {
            if (!analytic) {
                res.status(404).json({message: "No analytic was found with that id"})
                return;
            }
            Habit.findOneAndUpdate({ analytics: id }, { $pull: { analytics: id } })
                .then((habit) => {
                    if (!habit) {
                        console.log("An analytic was deleted but no habit was found with the analytic id")
                    }
                    res.status(200).json({message: "analytic successfully deleted", analytic: analytic});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({message: "An error has occurred while attempting to delete the analytic"});
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "An error has occurred while attempting to delete the analytic"});
        })
});

module.exports = router;