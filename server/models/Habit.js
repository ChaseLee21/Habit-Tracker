const { Schema, model, default: mongoose } = require('mongoose')
const moment = require('moment-timezone')

const habitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
    goal: { type: String, required: true },
    reward: { type: String, required: false },
    frequency: { type: Number, required: true },
    streak: { type: Number, required: false },
    weeks: [{ type: Schema.Types.ObjectId, ref: 'Week' }],
    emoji: { type: String, required: false }
})

habitSchema.methods.endDatePassed = function (timezone) {
    const endDate = this.weeks[this.weeks.length - 1].endDate
    const formattedEndDate = moment.tz(endDate, timezone).utc()
    const now = moment.tz(timezone).utc()
    return formattedEndDate.isBefore(now)
}

habitSchema.methods.createNewWeek = async function () {
    const Week = mongoose.model('Week')
    return await Week.create({ habit: this._id, user: this.user })
}

habitSchema.methods.updateStreak = async function () {
    const currentWeek = await this.currentWeek()
    let newStreak = this.streak
    let daysCompleted = 0
    try {
        for (const index of currentWeek.days) {
            const Day = mongoose.model('Day')
            if (await Day.findOne({ _id: index }).completed) {
                daysCompleted++
            }
        }
        if (daysCompleted < currentWeek.frequency) {
            newStreak = 0
        }
        return newStreak
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

habitSchema.methods.currentWeek = async function () {
    const Week = mongoose.model('Week')
    const id = this.weeks[this.weeks.length - 1]._id
    const data = await Week.findOne({ _id: id }).populate('days')
    return data
}

habitSchema.pre('save', async function () {
    if (!this.isNew) {
        return
    }
    this.streak = 0
    const Week = mongoose.model('Week')
    const firstWeek = await Week.create(
        {
            habit: this._id,
            user: this.user
        })
    this.weeks.push(firstWeek)
})

habitSchema.pre('findOneAndDelete', async function (next) {
    const Week = mongoose.model('Week')
    try {
        const habit = await this.model.findOne(this.getQuery())
        for (const week of habit.weeks) {
            await Week.deleteOne({ _id: week })
        }
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = model('Habit', habitSchema)
