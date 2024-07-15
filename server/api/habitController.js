const router = require('express').Router()
const { Habit, User, Week, Day } = require('../models/index')

// POST a new habit
router.post('/:userId', (req, res) => {
    const habitData = req.body
    const userId = req.params.userId
    // Create a new habit
    Habit.create(habitData)
        .then((habit) => {
            // Add the habit _id to the user's habits array
            User.findOneAndUpdate({ _id: userId }, { $push: { habits: habit._id } })
                .then((user) => {
                    if (!user) {
                        res.status(404).json({ message: 'No user found with this id' })
                        return
                    }
                    res.status(201).json({ message: 'Habit created successfully', habit })
                })
                .catch((err) => {
                    res.status(400).json(err)
                })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

// PUT updated habit by id
router.put('/:id', (req, res) => {
    const { id } = req.params
    const habitData = req.body
    Habit.findOneAndUpdate({ _id: id }, { $set: habitData })
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' })
                return
            }
            res.status(200).json({ message: 'Habit updated successfully', habit })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

// DELETE a habit by id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Habit.findOneAndDelete({ _id: id })
        .then((habit) => {
            if (!habit) {
                res.status(404).json({ message: 'No habit found with this id' })
                return
            }
            User.findOneAndUpdate({ habits: id }, { $pull: { habits: id } })
                .then((user) => {
                    if (!user) {
                        console.log('A habit was deleted but a user was not found with the habit id')
                    }
                    res.status(200).json({ message: 'Habit deleted successfully', habit })
                })
                .catch((err) => {
                    console.log(err)
                })
            Week.deleteMany({ habit: id })
                .then((week) => {
                    if (!week) {
                        console.log('A habit was deleted but a week was not found with the habit id')
                    }
                    
                })
                .catch((err) => {
                    console.log(err)
                })
            Day.deleteMany({ habit: id })
                    .then((day) => {
                        if (!day) {
                            console.log('A habit was deleted but a day was not found with the habit id')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

module.exports = router
