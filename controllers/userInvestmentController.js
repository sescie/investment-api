// controllers/userInvestmentController.js
const { UserInvestment } = require('../models');

exports.createUserInvestment = async (req, res) => {
  try {
    const userInvestment = await UserInvestment.create(req.body);
    res.status(201).json({ message: 'User investment added', userInvestment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserInvestments = async (req, res) => {
  try {
    const investments = await UserInvestment.findAll({ where: { userId: req.params.userId } });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserInvestment = async (req, res) => {
  try {
    const [updated] = await UserInvestment.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const updatedEntry = await UserInvestment.findByPk(req.params.id);
    res.json({ message: 'User investment updated', userInvestment: updatedEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserInvestment = async (req, res) => {
  try {
    const deleted = await UserInvestment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'User investment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
