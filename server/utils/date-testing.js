function setEndDate (timezone) {
    // set now to today in the user's timezone
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
    const today = now.getDay()

    // number of days til next the next Saturday, if today is Saturday, it will be 7
    const daysUntilNextSunday = (7 - today + 7) % 7 || 7

    // nextSaturday is the date of the next Saturday
    let nextSunday = new Date(now)
    nextSunday.setDate(now.getDate() + daysUntilNextSunday)
    nextSunday = nextSunday.toISOString().split('T')[0]

    // set endDate to the next Saturday
    console.log(nextSunday, 'nextSunday');
    return nextSunday
}

async function setDaysArray (endDate) {
    const days = []
    let currentDate = new Date(endDate)
    currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1))
    for (let i = 0; i < 7; i++) {
        let date = currentDate.toISOString().split('T')[0]
        days.push(date)
        currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1))
    }
    console.log(days, 'days');
    return days
}

function endDatePassed (endDate, timezone = `America/Los_Angeles`) {
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { timezone })
    const now = new Date().toLocaleDateString('en-US', { timezone })
    console.log(formattedEndDate, 'formattedEndDate');
    console.log(now, 'now');
    console.log(formattedEndDate < now, 'formattedEndDate < now');
    return formattedEndDate < now
}

const endDate = setEndDate('America/Los_Angeles')
setDaysArray(endDate)
endDatePassed(endDate, 'America/Los_Angeles')