const { Schema, model } = require('mongoose');

const analyticsSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, required: true }
});

module.exports = model('Analytics', analyticsSchema);