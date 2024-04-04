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
        await Habit.create(habitData);
        await Analytics.create(analyticsData);

        // HACK: This is not the best way to seed data, but it works for now
        // I am hardcoding the habits into the users
        // I am hardcoding the analytics into the habits
        for (let i = 0; i < habitData.length; i++) {
            const habit = await Habit.findOne({ name: habitData[i].name });
            const user = await User.findOne({ email: userData[i].email });
            habit.analytics.push(analyticsData[i]._id);
            habit.analytics.push(analyticsData[i + 3]._id);
            user.habits.push(habit._id);
            await user.save();
        }

        console.log('Data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
