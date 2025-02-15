// controllers/investmentController.js
const { Investment } = require('../models');

exports.createInvestment = async (req, res) => {
  try {
    const investment = await Investment.create(req.body);
    res.status(201).json({ message: 'Investment created', investment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.findAll();
    res.json(investments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInvestmentById = async (req, res) => {
  try {
    const investment = await Investment.findByPk(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Not found' });
    res.json(investment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const [updated] = await Investment.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const updatedInvestment = await Investment.findByPk(req.params.id);
    res.json({ message: 'Investment updated', investment: updatedInvestment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const deleted = await Investment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Investment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
