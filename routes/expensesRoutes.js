// routes/expenseRoutes.js
const express = require('express');
const { getExpenses, createExpense, updateExpense, deleteExpense } = require('../controllers/ExpensesController');

const router = express.Router();

router.get('/', getExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
