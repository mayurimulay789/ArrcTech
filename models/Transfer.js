const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  fromAccount: {
    type: String,
    enum: ['defaultAccount', 'fuel', 'otherOption1', 'otherOption2'],
    required: true,
  },
  toAccount: {
    type: String,
    enum: ['defaultAccount', 'fuel', 'otherOption1', 'otherOption2'],
    required: true,
  },
  transferDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  updatedBy: {
    type: String,
    required: true, // Make sure this is correctly filled by the application
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
