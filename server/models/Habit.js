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

habitSchema.methods.endDatePassed = function () {
    const endDate = this.weeks[this.weeks.length - 1].endDate
    const formattedEndDate = moment.tz(endDate, user.timezone).utc()
    const now = moment.tz(user.timezone).utc()
    return formattedEndDate.isBefore(now)
}

habit.habitSchema.methods.createNewWeek = async function () {
    const Week = mongoose.model('Week')
    return await Week.create({ habit: this._id, user: this.user })
}

habitSchema.methods.updateStreak = async function () {
    const currentWeek = this.currentWeek()
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

habit.schema.methods.currentWeek = async function () {
    const Week = mongoose.model('Week')
    return await Week.findOne({ habit: this.weeks[habit.weeks.length - 1]._id })
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

habitSchema.pre('remove', async function () {
    const Week = mongoose.model('Week')
    await Week.deleteMany({ habit: this._id })
})

module.exports = model('Habit', habitSchema)
