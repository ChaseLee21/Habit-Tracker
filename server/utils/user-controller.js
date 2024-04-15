const { User, Habit, Analytics } = require('../models');

async function createTodaysAnalytics(habits, userId) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0];
    const promises = habits.map(async (habit) => {
        if (!existingTodaysAnalytic(habit)) {
            let newAnalytic = {
                user: userId,
                habit: habit._id,
                date: today,
                completed: false,
                streak: 0
            };
            setAnalyticStreak(newAnalytic);
            await createAnalytic(newAnalytic, habit)
        }
    });

    await Promise.all(promises);

    function setAnalyticStreak(analytic) {
        const yesterdaysAnalytic = habit.analytics.find(analytic => analytic.date === yesterday);
        if (yesterdaysAnalytic && yesterdaysAnalytic.streak > 0 && yesterdaysAnalytic.completed) {
            analytic.streak = yesterdaysAnalytic.streak;
            analytic.yesterdayStreak = yesterdaysAnalytic.streak;
        }
    }

    function existingTodaysAnalytic(habit) {
        return habit.analytics.find(analytic => {
            return analytic.date.toISOString().split('T')[0] === today;
        });
    }

    async function createAnalytic(analytic, habit) {
        Analytics.create(analytic)
            .then((analytic) => {
                habit.analytics.push(analytic);
                habit.save();
            })
            .catch((err) => {
                console.log(err)
            });
    }
}

module.exports = { createTodaysAnalytics };