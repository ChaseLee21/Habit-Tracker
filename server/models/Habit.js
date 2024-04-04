const { Schema, model } = require('mongoose');

const habitSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
    goal: { type: String, required: true },
    reward: { type: String, required: true},
    frequency: { type: String, required: true },
    streak: { type: Number, required: false },
    longestStreak: { type: Number, required: false },
    analytics: { type: Array, required: false }
});

module.exports = model('Habit', habitSchema);