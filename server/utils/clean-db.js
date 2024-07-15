const express = require('express')
const db = require('../config/connection.js')
const cors = require('cors')
const { User, Habit, Week, Day } = require('../models/index.js')

// Create an Express app
const app = express()

// Middleware to allow react to connect to the server during development
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
db.once('open', async () => {
    console.log('Connected to MongoDB')

    const habits = await Habit.find()
    console.log('habits', habits)
})
