const { Schema, model } = require('mongoose')
const { Week } = require('./index')

const habitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    why: { type: String, required: true },
    goal: { type: String, required: true },
    reward: { type: String, required: false },
    frequency: { type: Number, required: true },
    streak: { type: Number, required: false },
    weeks: [{ type: Schema.Types.ObjectId, ref: 'Week' }]
})

habitSchema.on('init', async function () {
    this.streak = 0
    const firstWeek = await Week.create({ habit: this._id, user: this.user })
    this.weeks.push(firstWeek)
})

module.exports = model('Habit', habitSchema)
