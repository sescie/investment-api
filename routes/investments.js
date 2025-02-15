// routes/investments.js
const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, investmentController.createInvestment);
router.get('/', authMiddleware.verifyToken, investmentController.getInvestments);
router.get('/:id', authMiddleware.verifyToken, investmentController.getInvestmentById);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, investmentController.updateInvestment);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, investmentController.deleteInvestment);

module.exports = router;
