const { Schema, model } = require('mongoose');

const habitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
    goal: { type: String, required: true },
    reward: { type: String, required: true},
    frequency: { type: String, required: true },
    longestStreak: { type: Number, required: false },
    analytics: [{ type: Schema.Types.ObjectId, ref: 'Analytics' }]
});

module.exports = model('Habit', habitSchema);