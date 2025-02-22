// app.js
const express = require('express');
const cors = require('cors'); // Import cors here
const bodyParser = require('body-parser');
require('dotenv').config();
const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const investmentRoutes = require('./routes/investments');
const userInvestmentRoutes = require('./routes/userInvestments');

const app = express();

// Enable CORS for your frontend domain before any routes are added
app.use(cors({
  origin: 'http://srv712364.hstgr.cloud', // Allow your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Optional: specify allowed headers
}));

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
