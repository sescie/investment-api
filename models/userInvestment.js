// models/userInvestment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserInvestment = sequelize.define('UserInvestment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amountInvested: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purchasePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: DataTypes.DATE,
});

module.exports = UserInvestment;
