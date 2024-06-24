const { Week } = require('../models/index')
const router = require('express').Router()

//  get week by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const week = await Week.findOne({ _id: id })
        if (!week) {
            res.status(404).json({ message: 'No week found with this id' })
            return
        }
        res.status(200).json({ message: 'Week found successfully', week })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router
