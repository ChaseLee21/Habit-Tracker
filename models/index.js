// import models
const Stat = require('./Stat');
const Category = require('./Category');

// Products belongsTo Category
Stat.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Stat, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
