// controllers/expenseController.js
const Expense = require('../models/Expenses');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('account');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createExpense = async (req, res) => {
  const { account, date, amount, note } = req.body;

  try {
    const newExpense = new Expense({ account, date, amount, note });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { account, date, amount, note } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { account, date, amount, note },
      { new: true }
    );

    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });

    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
