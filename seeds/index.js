const sequelize = require('../config/connection');
const Stat = require('../models/Stat');
const Category = require('../models/Category');
const statsData = require('./stats-seed.json');
const categoryData = require('./category-seed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Categories
  console.log("Seeding Categories");
  await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Categories Seeded!");
  
  // Stats
  console.log("Seeding Stats");
  await Stat.bulkCreate(statsData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Stats Seeded!");


  process.exit(0);
};

seedDatabase();