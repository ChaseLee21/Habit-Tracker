const express = require('express');
const db = require('./config/connection.js');

const PORT = 3000

// Create an Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: server static files

//TODO: use api routes

// Connect to MongoDB
db.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
