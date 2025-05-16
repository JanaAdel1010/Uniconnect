const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Place = sequelize.define('Place', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  building: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Place;
