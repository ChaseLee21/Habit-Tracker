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
            res.json(analytics);
        })
        .catch((err) => {
            res.status(400).json({message: err})
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
            res.json(analytic);
        })
        .catch((err) => {
            res.status(400).json({message: err})
        })
});

//POST analytic
router.post('/', (req, res) => {
    Analytics.create(analyticData)
    .then((analytic) => {
        res.status(201).json({message: "analytic successfully created", analytic: analytic});
    })
    .catch((err) => {
        res.status(400).json({message: err});
    })
});

//PUT analytic by id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const analyticData = req.body
    Analytics.findByIdAndUpdate({ _id: id }, { $set: analyticData })
        .then((analytic) => {
            if (!analytic) {
                res.status(404).json({message: "No analytic was found with that id"})
                return;
            }
            res.json({message: "analytic successfully updated", analytic: analytic});
        })
        .catch((err) => {
            res.status(400).json({message: err});
        })
});

//Delete analytic by id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Analytics.findByIdAndDelete({ _id: id })
        .then((analytic) => {
            if (!analytic) {
                res.status(404).json({message: "No analytic was found with that id"})
                return;
            }
            res.json({message: "analytic successfully deleted", analytic: analytic});
        })
        .catch((err) => {
            res.status(400).json({message: err});
        })
});

module.exports = router;