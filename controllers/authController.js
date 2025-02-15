// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;
      
      // Debugging: Log the incoming request body
      console.log('Request Body:', req.body);
  
      // Check if password is valid before hashing
      if (!password || typeof password !== 'string') {
        console.error('Password is invalid:', password);
        return res.status(400).json({ error: 'Invalid password input' });
      }
  
      // Debugging: Log password before hashing (ensure it's a string)
      console.log('Password before hashing:', password);
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Debugging: Log hashed password (just for debugging purposes, be careful with production environments)
      console.log('Hashed Password:', hashedPassword);
  
      const user = await User.create({ fullName, email, password: hashedPassword, role });
  
      // Debugging: Log user object after creation
      console.log('Created User:', user);
  
      res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      // Debugging: Log the error
      console.error('Error occurred during registration:', err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
