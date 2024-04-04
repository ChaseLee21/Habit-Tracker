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
    User.findOne({ _id: id })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// POST a new user
router.post('/', (req, res) => {
    const userData = req.body;
    User.create(userData)
        .then((user) => {
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
    User.findOneAndUpdate(({ _id: id }, userData))
        .then((user) => {
            res.status(200).json({ message: 'User updated successfully', user: user});
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// DELETE user by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.findOneAndDelete({ _id: id })
        .then(() => {
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;