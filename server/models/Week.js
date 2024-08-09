const moment = require('moment-timezone')
const mongoose = require('mongoose')
const { Schema, model } = mongoose

const weekSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    frequency: { type: Number },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    endDate: { type: String },
    timezone: { type: String }
})

weekSchema.methods.setEndDate = function () {
    try {
        const now = moment.tz(this.timezone)
        console.log(now);
        const today = now.day()
        const daysUntilNextSunday = (7 - today + 7) % 7 || 7
        const nextSunday = now.add(daysUntilNextSunday, 'days').format('YYYY-MM-DD')
        return nextSunday
    } catch (error) {
        console.log(error)
    }
}

weekSchema.methods.setDaysArray = async function () {
    try {
        const days = []
        const Day = mongoose.model('Day')
        let currentDate = moment.tz(this.endDate, this.user.timezone)
        for (let i = 0; i < 7; i++) {
            const newDay = await Day.create({
                date: currentDate.subtract(1, 'days').format('YYYY-MM-DD'),
                completed: false,
                week: this._id,
                habit: this.habit
            })
            days.push(newDay._id)
        }
        return days
    } catch (error) {
        console.log(error);
    }
}

// 0 is Sunday, 6 is Saturday
weekSchema.pre('save', async function () {
    if (!this.isNew) {
        return
    }
    const User = mongoose.model('User')
    const userData = await User.findOne({ _id: this.user })
    this.timezone = userData.timezone
    this.endDate = this.setEndDate()
    this.days = await this.setDaysArray()
    this.frequency = this.habit.frequency
})

weekSchema.pre('remove', async function () {
    const Day = model('Day')
    await Day.deleteMany({ week: this._id })
})

module.exports = model('Week', weekSchema)
