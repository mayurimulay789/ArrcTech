const Deposit = require('../models/Deposits');

// Create a new deposit
exports.createDeposit = async (req, res) => {
  try {
    const deposit = new Deposit(req.body);
    await deposit.save();
    res.status(201).json(deposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all deposits with optional filters
exports.getDeposits = async (req, res) => {
  try {
    const { account, from, to, page = 1, perPage = 10 } = req.query;
    const query = {};
    
    if (account) query.accountId = account;
    if (from || to) query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
    
    const deposits = await Deposit.find(query)
      .populate('accountId', 'name')
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage));
    
    const total = await Deposit.countDocuments(query);
    
    res.json({ deposits, total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single deposit
exports.getDepositById = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id).populate('accountId', 'name');
    if (!deposit) return res.status(404).json({ error: 'Deposit not found' });
    res.json(deposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a deposit
exports.updateDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deposit) return res.status(404).json({ error: 'Deposit not found' });
    res.json(deposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a deposit
exports.deleteDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findByIdAndDelete(req.params.id);
    if (!deposit) return res.status(404).json({ error: 'Deposit not found' });
    res.json({ message: 'Deposit deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
