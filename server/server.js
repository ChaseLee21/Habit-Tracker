const express = require('express');
const db = require('./config/connection.js');
const api = require('./api/index.js');

const PORT = 3000

// Create an Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: server static files

app.use('/api', api);

// Connect to MongoDB
db.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

//GOAL 1: habit _id in the user document
//GOAL 2: analytic _id in the habit document