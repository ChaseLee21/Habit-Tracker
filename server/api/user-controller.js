const { User } = require('../models/index')
const { createAnalyticsForToday } = require('../utils/user-helpers')
const router = require('express').Router()
const { signToken } = require('../utils/auth')

// GET all users (for testing)
router.get('/', (req, res) => {
    User.find({})
        .then((users) => {
            if (!users || users.length === 0) {
                res.status(404).json({ message: 'No users were found' })
                return
            }
            res.json(users)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

// GET one user by id => populate habits => populate analytics => create new analytics if one is not found for today's date
// TODO: look into a possible bug where a new analytics is created with only a streak and _id property when this route is hit
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id }).populate({
            path: 'habits',
            populate: {
                path: 'analytics',
                model: 'Analytics'
            }
        })
        if (!user) return res.status(404).json({ message: 'No user found with this id' })
        if (user.habits.length === 0) return res.status(404).json({ message: 'No habits found for this user' })
        for (const habit of user.habits) {
            await createAnalyticsForToday(habit, user._id)
        }
        await user.save()
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
router.put('/:id', (req, res) => {
    const { id } = req.params
    const userData = req.body
    User.findOneAndUpdate({ _id: id }, { $set: userData })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' })
                return
            }
            res.status(200).json({ message: 'User updated successfully', user })
        })
        .catch((err) => {
            res.status(400).json(err.message)
        })
})

// DELETE user by id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    User.findOneAndDelete({ _id: id })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' })
                return
            }
            res.status(200).json({ message: 'User deleted successfully' })
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

module.exports = router
