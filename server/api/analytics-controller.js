const {Analytics} = require('../models/index');
const router = require("express").Router();

// GET all analytics
router.get('/', (req, res) => {
    Analytics.find({})
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
router.post('/', (req, res) => {
    const analyticData = req.body;
    Analytics.create(analyticData)
    .then((analytic) => {
        res.status(201).json({message: "analytic successfully created", analytic: analytic});
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
            res.status(200).json({message: "analytic successfully deleted", analytic: analytic});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "An error has occurred while attempting to delete the analytic"});
        })
});

module.exports = router;