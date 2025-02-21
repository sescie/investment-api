// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = require('./app'); 
const PORT = process.env.PORT || 3000;

// Enable CORS for a specific domain (or allow all origins if needed)
app.use(cors({
  origin: 'http://srv712364.hstgr.cloud', // Allow your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
