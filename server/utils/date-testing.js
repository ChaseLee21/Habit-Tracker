const moment = require('moment-timezone')

function setEndDate(timezone) {
    // Set 'now' to today in the user's timezone using moment-timezone
    const now = moment.tz(timezone)

    // Get today's day of the week (0-6, Sunday-Saturday)
    const today = now.day()

    // Calculate number of days until next Sunday. If today is Sunday, it will be 7
    const daysUntilNextSunday = (7 - today + 7) % 7 || 7

    // Calculate next Sunday's date by adding daysUntilNextSunday to 'now'
    const nextSunday = now.add(daysUntilNextSunday, 'days').format('YYYY-MM-DD')

    console.log(nextSunday, 'nextSunday')
    return nextSunday
}

async function setDaysArray(endDate, timezone) {
    const days = []
    let currentDate = moment.tz(endDate, timezone)

    for (let i = 0; i < 7; i++) {
        // Subtract one day at a time and format to 'YYYY-MM-DD'
        let date = currentDate.subtract(1, 'days').format('YYYY-MM-DD')
        days.push(date)
    }

    console.log(days)
    return days
}

function endDatePassed(endDate, timezone) {
    // Parse endDate in the given timezone and convert to UTC
    const endDateObj = moment.tz(endDate, timezone).utc()

    // Get the current date/time in the given timezone and convert to UTC
    const now = moment().tz(timezone).utc()

    console.log(endDateObj.format(), 'endDateObj UTC')
    console.log(now.format(), 'now UTC')
    console.log(endDateObj.isBefore(now), 'endDateObj < now')

    // Compare the dates in UTC
    return endDateObj.isBefore(now)
}

const endDate = setEndDate('America/Los_Angeles')
setDaysArray(endDate)
endDatePassed(endDate, 'America/Los_Angeles')