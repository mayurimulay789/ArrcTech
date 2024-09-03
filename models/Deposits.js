const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Deposit', depositSchema);
