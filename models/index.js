// models/index.js
const sequelize = require('../config/config');
const User = require('./user');
const Investment = require('./investment');
const UserInvestment = require('./userInvestment');

// Many-to-Many: Users <-> Investments
User.belongsToMany(Investment, { through: UserInvestment, foreignKey: 'userId' });
Investment.belongsToMany(User, { through: UserInvestment, foreignKey: 'investmentId' });

// Export models and sequelize instance
module.exports = { sequelize, User, Investment, UserInvestment };
