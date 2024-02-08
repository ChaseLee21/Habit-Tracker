const sequelize = require('../config/connection');
const Stat = require('../models/Stat');
const statsData = require('./stats-seed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Stat.bulkCreate(statsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();