const { Day } = require('../models/index')
const router = require('express').Router()
const mongoose = require('mongoose')

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
        if (day.completed === true) {
            const Week = mongoose.model('Week')
            const Habit = mongoose.model('Habit')
            const week = await Week.findOne({ _id: day.week })
            const habit = await Habit.findOne({ _id: week.habit })
            if (habit.streak) {
                habit.streak++
                habit.save()
            }
        }
        await day.save()
        res.status(200).json(day)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error has occurred while attempting to update the day' })
    }
})

module.exports = router
