const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const LostItem = sequelize.define('LostItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING } // path to uploaded image
});

module.exports = LostItem;
