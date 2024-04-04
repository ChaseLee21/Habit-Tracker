const User = require('../models/index');
const router = require('express').Router();

// GET all users
router.get('/', (req, res) => {
    User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// GET one user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findOne({ id: id })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// POST a new user

// PUT updated user by id

// DELETE user by id

module.exports = router;