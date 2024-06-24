const { Day } = require('../models/index')
const router = require('express').Router()

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
            // Using the week the day is in, find the habit and increment the streak
        }
        await day.save()
        res.status(200).json(day)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error has occurred while attempting to update the day' })
    }
})

module.exports = router
