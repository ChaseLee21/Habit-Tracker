const mongoose = require('mongoose');
const User = require('../models/User');
const Habit = require('../models/Habit');
const Analytics = require('../models/Analytics');
const db = require('../config/connection');

const userData = require('./userData.json');
const habitData = require('./habitData.json');
const analyticsData = require('./analyticsData.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Habit.deleteMany({});
        await Analytics.deleteMany({});

        await User.create(userData);

        for (let i = 0; i < habitData.length; i++) {
            habitData[i].user = await User.findOne().select('_id');
        }

        await Habit.create(habitData);

        for (let i = 0; i < analyticsData.length; i++) {
            analyticsData[i].habit = await Habit.findOne().select('_id');
        }

        await Analytics.create(analyticsData);

        console.log('Data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
