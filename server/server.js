const express = require('express');
const db = require('./config/connection.js');
const api = require('./api/index.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = 3000

// Create an Express app
const app = express();

// Middleware to allow react to connect to the server during development
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//TODO: server static files

app.use('/api', api);

// Connect to MongoDB
db.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});