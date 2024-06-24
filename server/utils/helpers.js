const { Analytics, Day } = require('../models')

async function createAnalyticsForToday (habit, userId, timezone) {
    const today = new Date().toLocaleString('en-US', { timeZone: timezone }).split(',')[0]
    const yesterday = new Date(Date.now() - 864e5).toLocaleString('en-US', { timeZone: timezone }).split(',')[0]
    if (!existingTodaysAnalytic()) {
        const newAnalytic = {
            user: userId,
            habit: habit._id,
            date: today,
            completed: false,
            streak: 0,
            yesterdayStreak: 0
        }
        setAnalyticStreak(newAnalytic)
        await createAnalytic(newAnalytic)
    }

    // Helper functions
    function setAnalyticStreak (analytic) {
        const yesterdaysAnalytic = habit.analytics.find(analytic => {
            return analytic.date === yesterday
        })
        if (yesterdaysAnalytic && yesterdaysAnalytic.streak > 0 && yesterdaysAnalytic.completed) {
            analytic.streak = yesterdaysAnalytic.streak
            analytic.yesterdayStreak = yesterdaysAnalytic.streak
        }
    }

    function existingTodaysAnalytic () {
        return habit.analytics.find(analytic => {
            return analytic.date === today
        })
    }

    async function createAnalytic (analytic) {
        try {
            const newAnalytic = await Analytics.create(analytic)
            habit.analytics.push(newAnalytic)
            await habit.save()
        } catch (err) {
            console.log(err)
        }
    }
}

function setEndDate (timezone) {
    // set now to today in the user's timezone
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
    const today = now.getDay()

    // number of days til next the next Saturday, if today is Saturday, it will be 7
    const daysUntilNextSaturday = (6 - today + 7) % 7 || 7

    // nextSaturday is the date of the next Saturday
    const nextSaturday = new Date(now)
    nextSaturday.setDate(now.getDate() + daysUntilNextSaturday)
    nextSaturday.setHours(0, 0, 0, 0)

    // set endDate to the next Saturday
    return nextSaturday
}

async function setDaysArray (endDate) {
    const days = []
    for (let i = 0; i < 7; i++) {
        const day = await Day.create({ date: endDate.getDate() - i })
        days.push(day)
    }
    return days
}

module.exports = { createAnalyticsForToday, setEndDate, setDaysArray }
