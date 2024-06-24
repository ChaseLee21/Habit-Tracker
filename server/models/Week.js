const { Schema, model } = require('mongoose')
const { setEndDate, setDaysArray } = require('../utils/helpers')

const weekSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    frequency: { type: Number, required: true },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    endDate: { type: Date, required: true }
})

// 0 is Sunday, 6 is Saturday
weekSchema.on('init', function () {
    this.endDate = setEndDate(this.user.timezone)
    this.days = setDaysArray(this.endDate, this._id)
    this.frequency = this.habit.frequency
})

module.exports = model('Habit', weekSchema)
