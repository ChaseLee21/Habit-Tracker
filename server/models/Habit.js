const { Schema, model } = require('mongoose');
const shortid = require('shortid');

const habitSchema = new Schema({
    id: { type: String, required: false },
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

habitSchema.pre('save', function(next) {
    this.id = shortid.generate();
    next();
});

module.exports = model('Habit', habitSchema);