// models/Deposit.js
const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  depositDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  note: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String, default: 'Admin' } // Assuming admin as a placeholder
});

module.exports = mongoose.model('Deposit', depositSchema);
