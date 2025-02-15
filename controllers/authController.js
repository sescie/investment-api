// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;
  
      console.log("Request Body:", req.body);
      console.log("Password type:", typeof password);
      console.log("Password value:", password);
      console.log("Password before hashing:", password);
  
      // Check if password is a string before hashing
      if (typeof password !== "string") {
        console.error("Password is not a string");
        return res.status(400).json({ error: "Password must be a string" });
      }
  
      // Hash the password using bcrypt (C++ binding)
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      console.log("Hashed password:", hashedPassword);
  
      // Create user with hashed password
      const user = await User.create({ fullName, email, password: hashedPassword, role });
  
      res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      console.error("Error occurred during registration:", err);
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
