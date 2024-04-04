const router = require('express').Router();
const { Habit } = require('../models/index');

// GET all habits
router.get('/', (req, res) => {
    Habit.find({})
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

// GET one habit by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Habit.findOne({ _id: id })
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' });
                return;
            }
            res.json(habit);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// POST a new habit
router.post('/', (req, res) => {
    const habitData = req.body;
    Habit.create(habitData)
        .then((habit) => {
            res.status(201).json({ message: 'Habit created successfully', habit: habit });
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

// DELETE a habit by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Habit.findOneAndDelete({ _id: id })
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' });
                return;
            }
            res.status(200).json({ message: 'Habit deleted successfully', habit: habit});
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;