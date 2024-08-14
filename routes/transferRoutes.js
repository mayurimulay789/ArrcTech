const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');

// Get all transfers
router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new transfer
router.post('/', async (req, res) => {
  const transfer = new Transfer({
    fromAccount: req.body.fromAccount,
    toAccount: req.body.toAccount,
    transferDate: req.body.transferDate,
    amount: req.body.amount,
    note: req.body.note,
    updatedBy: req.body.updatedBy
  });

  try {
    const newTransfer = await transfer.save();
    res.status(201).json(newTransfer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing transfer
router.put('/:id', async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: 'Transfer not found' });
    }

    transfer.fromAccount = req.body.fromAccount;
    transfer.toAccount = req.body.toAccount;
    transfer.transferDate = req.body.transferDate;
    transfer.amount = req.body.amount;
    transfer.note = req.body.note;
    transfer.updatedBy = req.body.updatedBy;
    transfer.updatedAt = Date.now();

    const updatedTransfer = await transfer.save();
    res.json(updatedTransfer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a transfer
router.delete('/:id', async (req, res) => {
    try {
      // Find the transfer by ID and delete it
      const transfer = await Transfer.findByIdAndDelete(req.params.id);
  
      // Check if the transfer was found and deleted
      if (!transfer) {
        return res.status(404).json({ message: 'Transfer not found' });
      }
  
      // Send success response
      res.json({ message: 'Transfer deleted' });
    } catch (err) {
      // Handle any errors that occur
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
