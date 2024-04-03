const mongoose = require('mongoose');
const User = require('./User');
const Habit = require('./Habit');
const Analytics = require('./Analytics');
const db = require('../config');

const userData = require('./userData.json');
const habitData = require('./habitData.json');
const analyticsData = require('./analyticsData.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Habit.deleteMany({});
        await Analytics.deleteMany({});

        await User.create(userData);
        await Habit.create(habitData);
        await Analytics.create(analyticsData);

        console.log('Data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
