const { Schema, model } = require('mongoose')

const weekSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    frequency: { type: Number, required: true },
    days: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    endDate: { type: Date, required: true }
})

module.exports = model('Habit', weekSchema)
