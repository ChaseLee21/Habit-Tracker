const { Schema, model } = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: false },
    habits: [{ type: Schema.Types.ObjectId, ref: 'Habit' }],
    todos: [{ type: String, required: false }],
    timezone: { type: String, required: true, default: 'America/Los_Angeles' },
    emojis: { type: String, required: false, default: '☀️' },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false }
})

// Method to generate a reset token
userSchema.methods.generateResetToken = function () {
    const resetToken = jwt.sign({id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    this.resetPasswordToken = resetToken
    this.resetPasswordExpires = Date.now() + 3600000 // 1 hour
    return resetToken
}

// Method to check the password
userSchema.methods.checkPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.password === hash
}

userSchema.methods.endOfWeek = async function () {
        // helper functions
        function EndDatePassed (habit) {
            const endDate = habit.weeks[habit.weeks.length - 1].endDate
            const formattedEndDate = moment.tz(endDate, user.timezone).utc()
            const now = moment.tz(user.timezone).utc()
            return formattedEndDate.isBefore(now)
        }
    
        async function updateStreak (habit) {
            let newStreak = habit.streak;
            const thisWeek = habit.weeks[habit.weeks.length - 1]
            let daysCompleted = 0
            for (const day of thisWeek.days) {
                if (day.completed) {
                    daysCompleted++
                }
            }
            if (daysCompleted < thisWeek.frequency) {
                newStreak = 0
            }
            return newStreak
        }
    
        async function createNewWeek (habit) {
            const Week = mongoose.model('Week')
            return await Week.create({ habit: habit._id, user: user._id })
        }
        try {
            for (const habit of this.habits) {
                if (EndDatePassed(habit)) {
                    const Habit = mongoose.model('Habit')
                    // Check if frequency was met and update streak
                    const newStreak = await updateStreak(habit)
                    // Create new week document
                    const newWeek = await createNewWeek(habit)
                    habit.weeks.push(newWeek._id)
                    // Update habit document
                    await Habit.findOneAndUpdate({ _id: habit._id }, { $set: { streak: newStreak, weeks: habit.weeks } })
                }
            }
            return this
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
}

// Middleware to hash the password before saving
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.salt = crypto.randomBytes(16).toString('hex')

    crypto.pbkdf2(this.password, this.salt, 1000, 64, 'sha512', (err, hash) => {
        if (err) {
            return next(err)
        }

        this.password = hash.toString('hex')
        next()
    })
})

// Middleware to populate habits, weeks, and days
userSchema.pre('findOne', function (next) {
    this.populate({
        path: 'habits',
            model: 'Habit',
            populate: {
                path: 'weeks',
                model: 'Week',
                populate: {
                    path: 'days',
                    model: 'Day'
                }
            }
    })
    next()
})

// Middleware to remove password and salt from the response
userSchema.pre('findOne', function (next) {
    this.select('-password -salt')
    next()
})

// Middleware to hash the password before updating
userSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate()

    // Check if $set exists and password is being updated
    if (!update.$set || !update.$set.password) {
        return next()
    }

    try {
        const password = update.$set.password
        const salt = crypto.randomBytes(16).toString('hex')

        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, hash) => {
            if (err) {
                return next(err)
            }

            update.$set.password = hash.toString('hex')
            update.$set.salt = salt
            next()
        })
    } catch (err) {
        return next(err)
    }
})

userSchema.pre('remove', async function () {
    const Habit = model('Habit')
    await Habit.deleteMany({ user: this._id })
})

module.exports = model('User', userSchema)
