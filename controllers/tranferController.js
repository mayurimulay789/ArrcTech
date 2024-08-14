// controllers/transferController.js
const Transfer = require('../models/transferModel');

// Fetch all transfers
const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.status(200).json(transfers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transfers' });
  }
};

// Create a new transfer
const createTransfer = async (req, res) => {
  const { fromAccount, toAccount, transferDate, amount, note, updatedBy } = req.body;

  if (!fromAccount || !toAccount || !amount || !transferDate) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  try {
    const newTransfer = new Transfer({
      fromAccount,
      toAccount,
      transferDate,
      amount,
      note,
      updatedBy,
      updatedAt: new Date()
    });

    await newTransfer.save();
    res.status(201).json(newTransfer);
  } catch (error) {
    res.status(500).json({ error: 'Error saving transfer' });
  }
};

// Update a transfer
const updateTransfer = async (req, res) => {
  const { id } = req.params;
  const { fromAccount, toAccount, transferDate, amount, note, updatedBy } = req.body;

  try {
    const transfer = await Transfer.findById(id);
    if (!transfer) {
      return res.status(404).json({ error: 'Transfer not found' });
    }

    transfer.fromAccount = fromAccount;
    transfer.toAccount = toAccount;
    transfer.transferDate = transferDate;
    transfer.amount = amount;
    transfer.note = note;
    transfer.updatedBy = updatedBy;
    transfer.updatedAt = new Date();

    await transfer.save();
    res.status(200).json(transfer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating transfer' });
  }
};

// Delete a transfer
// Delete a transfer
const deleteTransfer = async (req, res) => {
    const { id } = req.params;
  
    try {
      const transfer = await Transfer.findByIdAndDelete(id); // Use findByIdAndDelete
      if (!transfer) {
        return res.status(404).json({ error: 'Transfer not found' });
      }
  
      res.status(200).json({ message: 'Transfer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting transfer' });
    }
  };
  

module.exports = {
  getTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer
};
