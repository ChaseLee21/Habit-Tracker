const { Schema, model } = require('mongoose');

const analyticsSchema = new Schema({
    date: { type: Date, required: true },
    completed: { type: Boolean, required: true }
});

module.exports = model('Analytics', analyticsSchema);