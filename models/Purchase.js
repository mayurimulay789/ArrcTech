const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  supplierId: {
    type: String,
    required: true,
    enum: ["1", "2"], // You can expand this enum to include more options if needed
  },
  invoiceNo: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash", "Card", "Cash/Card"], // Possible options for payment method
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '', // Default to an empty string if not provided
  },
  ingredientItem: {
    type: String,
    enum: ["1", "2", "3", "4", "5", "6"], // Ingredient item options
    default: '', // Default to an empty string if not provided
  },
  cart: [{
    itemName: String,
    stock: Number,
    quantity: Number,
    price: Number,
    total: Number,
  }],
  totalBill: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  dueAmount: {
    type: Number,
    default: 0, // Default to 0 if not provided
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);