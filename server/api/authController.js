const { User } = require('../models')
const { authMiddleware, signToken } = require('../utils/auth')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

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

router.post('/reset-password', async (req, res) => {
    // Find user by email
    try {
        console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: 'No user with that email!' })
        }
    
        // Generate reset token
        const resetToken = user.generateResetToken()
        await user.save()
    
        // Setup email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    
        // Setup email data
        const mailOptions = {
            from: `"Habit Tracker" <${process.env.EMAIL}>`,
            to: user.email,
            subject: 'Reset your password',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://habit-tracker-jukt.onrender.com/reset-password/${resetToken}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        }
    
        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Email sent!' });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error finding user' })
    }
    
})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body.newPassword

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ 
            _id: decoded.id,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } 
        })

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        user.password = newPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Invalid token' });
    }
})

module.exports = router