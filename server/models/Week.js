const { Schema, model } = require('mongoose')
const { setEndDate, setDaysArray } = require('../utils/helpers')

const weekSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    frequency: { type: Number },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    endDate: { type: Date }
})

// 0 is Sunday, 6 is Saturday
weekSchema.pre('save', async function () {
    if (!this.isNew) {
        return
    }
    this.endDate = setEndDate(this.user.timezone)
    this.days = await setDaysArray(this.endDate, this._id, this.habit._id)
    this.frequency = this.habit.frequency
})

module.exports = model('Week', weekSchema)
