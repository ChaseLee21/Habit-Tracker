const { Day } = require('../models/index')
const router = require('express').Router()
const mongoose = require('mongoose')
const Habit = mongoose.model('Habit')

//  PUT day by id (used to update the completed status)
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const dayData = req.body
    try {
        const day = await Day.findOneAndUpdate({ _id: id }, dayData, { new: true })
        if (!day) {
            res.status(404).json({ message: 'No day was found with that id' })
            return
        }
        // Update the streak
        const habit = await Habit.findOne({ _id: day.habit })
        if (day.completed === true && habit.streak !== undefined) {
            habit.streak++
        } else if (day.completed === false && habit.streak !== undefined) {
            habit.streak--
        }
        await habit.save()
        await day.save()
        res.status(200).json(day)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error has occurred while attempting to update the day' })
    }
})

module.exports = router
