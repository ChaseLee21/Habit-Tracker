const { User } = require('../models')
const { authMiddleware, signToken } = require('../utils/auth')
const router = require('express').Router()

router.use('/login', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            console.log('no user found')
            res.status(401).json({ message: 'No user with that email!' })
            return
        }
        if (!user.checkPassword(req.body.password, user.salt)) {
            console.log('password incorrect')
            res.status(401).json({ message: 'Wrong password!' })
            return
        }
        user = user.toObject()
        delete user.salt
        delete user.password
        const token = signToken(user)
        res.cookie('habitTrackerToken', token, { secure: false, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 })
        res.json({ user })
    })
})

router.use('/checkToken', authMiddleware, async (req, res) => {
    res.json({ user: req.user })
})

router.use('/reset-password', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(401).json({ message: 'No user with that email!' })
        return 
    }
    // TODO: send email with reset link
    res.json({ message: 'Email sent!' })
})

module.exports = router