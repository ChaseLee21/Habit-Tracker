const mongoose = require('mongoose')
const moment = require('moment-timezone')

function setEndDate (timezone) {
    const now = moment.tz(timezone)
    const today = now.day()
    const daysUntilNextSunday = (7 - today + 7) % 7 || 7
    const nextSunday = now.add(daysUntilNextSunday, 'days').format('YYYY-MM-DD')
    return nextSunday
}

async function setDaysArray (endDate, weekId, habitId, timezone) {
    const days = []
    const Day = mongoose.model('Day')
    let currentDate = moment.tz(endDate, timezone)
    for (let i = 0; i < 7; i++) {
        const newDay = await Day.create({
            date: currentDate.subtract(1, 'days').format('YYYY-MM-DD'),
            completed: false,
            week: weekId,
            habit: habitId
        })
        days.push(newDay._id)
    }
    return days
}

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

module.exports = { setEndDate, setDaysArray, addEmoji, removeEmoji, deleteDay, deleteWeek }
