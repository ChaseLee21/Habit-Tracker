import axios from 'axios'

// Day API calls
async function putDay (day) {
    try {
        const request = await axios.put('/api/days/' + day._id, day)
        return request.data
    } catch (err) {
        console.log(err)
    }
}

// User API calls
async function getUser (userId) {
    try {
        const request = await axios.get('/api/users/' + userId)
        return request.data
    } catch (err) {
        console.log(err)
    }
}
async function putUser (id, userData) {
    try {
        const request = await axios.put('/api/users/' + id, userData)
        return request.data
    } catch (err) {
        console.log(err)
    }
}
async function postUser (userData) {
    try {
        const request = await axios.post('/api/users', userData)
        return request.data
    } catch (err) {
        console.log(err)
    }
}

// Habit API calls
async function postHabit (id, habitData) {
    try {
        const request = await axios.post('/api/habits/' + id, habitData, { withCredentials: true })
        return request.data
    } catch (err) {
        console.log(err)
    }
}

async function putHabit (habit) {
    try {
        console.log(habit)
        const request = await axios.put('/api/habits/' + habit._id, habit)
        return request.data
    } catch (err) {
        console.log(err)
    }
}

async function deleteHabit (habit) {
    try {
        const request = await axios.delete('/api/habits/' + habit._id)
        return request.data
    } catch (err) {
        console.log(err)
    }
}

// Auth API calls
async function checkToken () {
    try {
        const request = await axios.get('/api/checkToken', { withCredentials: true })
        return request.data
    } catch (err) {
        return err
    }
}
async function login (userData) {
    try {
        const request = await axios.post('/api/login', userData, { withCredentials: true })
        console.log(request)
        return request
    } catch (err) {
        console.log(err)
        return err.response
    }
}
async function resetPassword (email) {
    try {
        const request = await axios.post('/api/reset-password', email)
        return request.data
    } catch (err) {
        console.log(err)
    }
}

export { putDay, getUser, putUser, postUser, checkToken, login, resetPassword, postHabit, putHabit, deleteHabit }
