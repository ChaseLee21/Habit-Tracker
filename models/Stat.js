const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stat extends Model {}

Stat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    person: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streak: {
      type: DataTypes.BOOLEAN,
    },
    last_date: {
      type: DataTypes.DATE,
    },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'stat',
    }
);

module.exports = Stat;