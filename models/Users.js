const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String },
  password: { type: String },
  role: { type: String, required: true, enum: ['Admin', 'Staff', 'Delivery Man', 'Waiter'] },
  permissions: [{ type: String }], // Array of strings for permissions
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
