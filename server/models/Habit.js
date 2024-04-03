const { Schema, model } = require('mongoose');

const habitSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
    goal: { type: String, required: true },
    reward: { type: String, required: true},
    frequency: { type: Number, required: true },
    streak: { type: Number, required: true },
    longestStreak: { type: Number, required: true },
    analytics: { type: Array, required: true }
});

module.exports = model('Habit', habitSchema);