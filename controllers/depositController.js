// controllers/depositController.js
const Deposit = require('../models/Deposits');

// Get all deposits with filters and pagination
exports.getDeposits = async (req, res) => {
  try {
    const { fromDate, toDate, account, search, page = 1, pageSize = 10 } = req.query;

    const filters = {};
    if (fromDate && toDate) {
      filters.depositDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }
    if (account && account !== 'All') {
      filters.account = account;
    }
    if (search) {
      filters.note = { $regex: new RegExp(search, 'i') };
    }

    const deposits = await Deposit.find(filters)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    const totalCount = await Deposit.countDocuments(filters);

    res.json({ deposits, totalCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deposits', error });
  }
};

// Create a new deposit
exports.createDeposit = async (req, res) => {
  try {
    const deposit = new Deposit(req.body);
    await deposit.save();
    res.status(201).json(deposit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating deposit', error });
  }
};

// Update a deposit
exports.updateDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDeposit = await Deposit.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedDeposit);
  } catch (error) {
    res.status(500).json({ message: 'Error updating deposit', error });
  }
};

// Delete a deposit
exports.deleteDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    await Deposit.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting deposit', error });
  }
};
