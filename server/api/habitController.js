const router = require('express').Router()
const { Habit, User } = require('../models/index')

// POST a new habit
router.post('/:userId', async (req, res) => {
    const habitData = req.body
    const userId = req.params.userId
    try {
        const habit = await Habit.create(habitData)
        if (!habit) {
            res.status(400).json({ message: 'Habit could not be created' })
            return
        }
        const user = await User.findOneAndUpdate({ _id: userId }, { $push: { habits: habit._id } })
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.status(201).json({ message: 'Habit created successfully', habit })
    } catch (error) {
        console.error("Failed to create habit:", error)
        res.status(400).json(error)
    }
})

// PUT updated habit by id
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const habitData = req.body
    try {
        const updatedHabit = await Habit.findOneAndUpdate({ _id: id }, { $set: habitData }, { new: true }).populate({
            path: 'weeks',
            model: 'Week',
            populate: {
                path: 'days',
                model: 'Day'
            }
        })
        if (!updatedHabit) return res.status(404).json({ message: 'No habit found with this id' })
        res.status(200).json({ message: 'Habit updated successfully', habit: updatedHabit })
    } catch (error) {
        console.error("Failed to update habit:", error)
        res.status(400).json(error)
    }
})

// DELETE a habit by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const habit = await Habit.findByIdAndDelete(id)
        if (!habit) {
            res.status(404).json({ message: 'No habit found with this id' })
            return
        }
        res.status(200).json({ message: 'Habit deleted successfully', habit })
    } catch (error) {
        console.error("Failed to create habit:", error)
        res.status(400).json(error)
    }
})

module.exports = router
