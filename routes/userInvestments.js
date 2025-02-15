// routes/userInvestments.js
const express = require('express');
const router = express.Router();
const userInvestmentController = require('../controllers/userInvestmentController');
const authMiddleware = require('../middleware/auth');

// For a user to add/view their investments
router.post('/', authMiddleware.verifyToken, userInvestmentController.createUserInvestment);
router.get('/:userId', authMiddleware.verifyToken, userInvestmentController.getUserInvestments);
router.put('/:id', authMiddleware.verifyToken, userInvestmentController.updateUserInvestment);
router.delete('/:id', authMiddleware.verifyToken, userInvestmentController.deleteUserInvestment);

module.exports = router;
