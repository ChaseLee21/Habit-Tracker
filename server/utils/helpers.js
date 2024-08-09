const mongoose = require('mongoose')

async function addEmoji (habit) {
    const User = mongoose.model('User')
    const user = await User.findOne({ habits: habit._id })
    if (habit.emoji) user.emojis += habit.emoji
    await user.save()
}

async function removeEmoji (habit) {
    const User = mongoose.model('User')
    const user = await User.findOne({ habits: habit._id })
    if (habit.emoji) user.emojis = user.emojis.replace(habit.emoji, '')
    await user.save()
}

async function deleteDay (day) {
    try {
        console.log('day without a habit', day._id, day.date)
        const Day = mongoose.model('Day')
        await Day.deleteOne({ _id: day._id })
    } catch (err) {
        console.log(err)
    }
}

async function deleteWeek (week) {
    try {
        console.log('week without a habit', week._id, week.endDate)
        const Week = mongoose.model('Week')
        await Week.deleteOne({ _id: week._id })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addEmoji, removeEmoji, deleteDay, deleteWeek }
