const { Schema, model } = require('mongoose')

const habitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
    goal: { type: String, required: true },
    reward: { type: String, required: false },
    frequency: { type: Number, required: true },
    longestStreak: { type: Number, required: false },
    streak: { type: Number, required: false },
    weeks: [{ type: Schema.Types.ObjectId, ref: 'Week' }]
})

module.exports = model('Habit', habitSchema)
