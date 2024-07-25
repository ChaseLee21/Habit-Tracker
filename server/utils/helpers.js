const mongoose = require('mongoose')
const moment = require('moment-timezone')

async function endOfWeek (user) {
    // helper functions
    function EndDatePassed (habit) {
        const endDate = habit.weeks[habit.weeks.length - 1].endDate
        const formattedEndDate = moment.tz(endDate, user.timezone).utc()
        const now = moment.tz(user.timezone).utc()
        return formattedEndDate.isBefore(now)
    }

    function updateStreak (habit) {
        const thisWeek = habit.weeks[habit.weeks.length - 1]
        let daysCompleted = 0
        for (const day of thisWeek.days) {
            if (day.completed) {
                daysCompleted++
            }
        }
        if (daysCompleted < thisWeek.frequency) {
            return 0
        }
        return habit.streak
    }

    async function createNewWeek (habit) {
        const Week = mongoose.model('Week')
        return await Week.create({ habit: habit._id, user: user._id })
    }

    for (const habit of user.habits) {
        if (EndDatePassed(habit)) {
            // Check if frequency was met and update streak
            habit.streak = await updateStreak(habit)
            // Create new week document
            habit.weeks.push(await createNewWeek(habit, user.timezone))
            // Save habit
            await habit.save()
        }
    }
    await user.save()
    return user
}

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

module.exports = { endOfWeek, setEndDate, setDaysArray, addEmoji, removeEmoji, deleteDay, deleteWeek }
