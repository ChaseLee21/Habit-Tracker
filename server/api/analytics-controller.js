const {Analytics, Habit} = require('../models/index');
const router = require("express").Router();

// GET all analytics for a user (not yet implemented on front end)
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

//PUT analytic by id (used to update the completed status)
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const analyticData = req.body;
    Analytics.findOneAndUpdate({ _id: id }, { $set: analyticData }, { new: true })
        .then((analytic) => {
            if (!analytic) {
                res.status(404).json({message: "No analytic was found with that id"})
                return;
            }
            if (analytic.completed) {
                analytic.streak = analytic.yesterdayStreak + 1;
            } else {
                analytic.streak = analytic.yesterdayStreak;
            }
            res.status(200).json({message: "analytic successfully updated", analytic: analytic});
        })
        .catch((err) => {
            console.log(err);
        res.status(500).json({message: "An error has occurred while attempting to update the analytic"});
        })
});

//Delete analytic by id (not yet implemented on front end)
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