const { User } = require('../models/index')
const router = require('express').Router()
const { signToken } = require('../utils/auth')

// Get user by id
// Check if any new instances of Week document need to be created for the user
// Check if streak needs to be updated for each habit
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        let user = await User.findOne({ _id: id })
        if (!user) return res.status(404).json({ message: 'No user found with this id' })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// POST a new user
router.post('/', async (req, res) => {
    const userData = req.body
    try {
        let user = await User.create(userData)
        if (!user) return res.status(400).json({ message: 'User could not be created' })
        user = user.toObject()
        delete user.password
        delete user.salt
        const token = signToken(user)
        res.cookie('HabitTrackerToken', token, { httpOnly: true })
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// PUT updated user by id
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const userData = req.body
    try {
        let user = await User.findOneAndUpdate({ _id: id }, { $set: userData }, { new: true })
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        user = user.toObject()
        delete user.password
        delete user.salt
        res.status(200).json({ message: 'User updated successfully', user })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// DELETE user by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        let user = await User.findOneAndDelete({ _id: id })
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router
