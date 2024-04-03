const { Schema, model } = require('mongoose');
const shortid = require('shortid');

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

habitSchema.pre('save', function(next) {
    this.id = shortid.generate();
    next();
});

module.exports = model('Habit', habitSchema);