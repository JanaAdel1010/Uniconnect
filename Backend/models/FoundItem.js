const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FoundItem = sequelize.define('FoundItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  foundDate: { type: DataTypes.DATEONLY, allowNull: false },
  extra: { type: DataTypes.TEXT } 
});

module.exports = FoundItem;
