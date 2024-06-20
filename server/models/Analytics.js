const { Schema, model } = require('mongoose')

const analyticsSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    completed: { type: Boolean, required: true },
    streak: { type: Number, required: true, default: 0 },
    yesterdayStreak: { type: Number, required: false }
})

module.exports = model('Analytics', analyticsSchema)
