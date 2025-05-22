const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
    email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  building: {
    type: DataTypes.STRING,
    allowNull: false
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hours: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Doctor;
