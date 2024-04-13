const mongoose = require('mongoose');
const User = require('../models/User');
const Habit = require('../models/Habit');
const Analytics = require('../models/Analytics');
const db = require('../config/connection');

db.once('open', async () => {
    try {

        console.log("Dropping tables in the database");

        await Analytics.deleteMany();
        await Habit.deleteMany();
        await User.deleteMany();

        console.log("Creating tables in the database");
        console.log("Adding user to the database");
        
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'password123',
            habits: []
        });
        
        console.log("Adding habit to the user");
        
        const habit = await Habit.create({
            user: user._id,
            name: 'Exercise',
            description: "I want to exercise more often to improve my health and fitness.",
            why: "I want to be healthier and feel better about myself.",
            goal: "My habit is complete once I have jogged for 20 minutes",
            reward: "I will reward myself with new shoes once I have completed my habit 30 times.",
            frequency: "3 times a week",
            longestStreak: 0,
            analytics: []
        });

        console.log("Adding analytics to the habit");

        const today = await Analytics.create({
            habit: habit._id,
            user: user._id,
            date: new Date().toISOString().split('T')[0],
            completed: false,
            streak: 1,
            yesterdayStreak: 1
        });

        const yesterday = await Analytics.create({
            habit: habit._id,
            user: user._id,
            date: new Date(Date.now() - 864e5).toISOString().split('T')[0],
            completed: true,
            streak: 0,
            yesterdayStreak: 0
        });

        console.log("Saving...");

        await habit.analytics.push(today);
        await habit.analytics.push(yesterday);
        await habit.save();
        await user.habits.push(habit);
        await user.save();

        console.log("Seed data has been added to the database");

        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
