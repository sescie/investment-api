// models/investment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Investment = sequelize.define('Investment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  investmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('stock', 'bond', 'mutual_fund', 'real_estate', 'cryptocurrency'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  riskLevel: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  },
  marketValue: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: DataTypes.DATE,
});

module.exports = Investment;
