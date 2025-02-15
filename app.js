// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const investmentRoutes = require('./routes/investments');
const userInvestmentRoutes = require('./routes/userInvestments');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/user-investments', userInvestmentRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Investment Management API is running.');
});

// Sync database (for development)
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing DB:', err));

module.exports = app;
