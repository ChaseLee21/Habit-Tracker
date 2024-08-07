const express = require('express')
const db = require('./config/connection.js')
const api = require('./api/index.js')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000

// Create an Express app
const app = express()

// Middleware to allow react to connect to the server during development
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api', api)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
}

// Connect to MongoDB
db.on('error', console.error.bind(console, 'connection error:'));

let server;
db.once('open', () => {
    console.log('Connected to MongoDB');

    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

module.exports = { app, server }; // Export both app and server
