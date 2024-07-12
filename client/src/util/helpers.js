const splitEmoji = (string) => [...new Intl.Segmenter().segment(string)].map(x => x.segment)

const findDay = (week, timezone) => {
    console.log(week, timezone);
    const localDay = new Date().toLocaleString('en-US', { timeZone: timezone }).split(',')[0]
    const today = new Date(localDay).toISOString().split('T')[0]
    const day = week.days.find(day => day.date === today)
    return day
}

const findWeek = (habit) => {
    const week = habit.weeks[habit.weeks.length - 1]
    return week
}

const findNumberOfDaysCompleted = (week) => {
    let daysCompleted = 0
    week.days.forEach(day => {
        if (day.completed === true) {
            daysCompleted++
        }
    })
    return daysCompleted
}

function validateEmail (email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

function validateUsername (username) {
    const re = /^[a-zA-Z0-9]{6,}$/
    return re.test(username)
}

function validatePassword (password, confirmPassword) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (password !== confirmPassword) {
        return false
    }
    return re.test(password)
}

function validateLoginPassword (password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return re.test(password)
}

function validateTimezone (timezone) {
    const timezones = [
        'Pacific/Midway',
        'Pacific/Honolulu',
        'America/Anchorage',
        'America/Los_Angeles',
        'America/Phoenix',
        'America/Denver',
        'America/Chicago',
        'America/New_York',
        'America/Caracas',
        'America/Halifax',
        'America/St_Johns',
        'America/Argentina/Buenos_Aires',
        'America/Sao_Paulo',
        'Atlantic/Azores',
        'Europe/London',
        'Europe/Paris',
        'Europe/Istanbul',
        'Europe/Moscow',
        'Asia/Dubai',
        'Asia/Karachi',
        'Asia/Dhaka',
        'Asia/Jakarta',
        'Asia/Shanghai',
        'Asia/Tokyo',
        'Australia/Sydney',
        'Pacific/Auckland'
    ]
    return timezones.includes(timezone)
}

export { splitEmoji, findDay, findWeek, findNumberOfDaysCompleted, validateEmail, validateUsername, validatePassword, validateLoginPassword, validateTimezone}