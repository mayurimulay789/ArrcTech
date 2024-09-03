const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  department: { type: String, required: true },  // Changed from ObjectId to String
  designation: { type: String, required: true }, // Changed from ObjectId to String
  shift: { type: String, required: true },  
  name: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  leavingDate: { type: Date },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  nidNumber: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], default: 'Male' },
  religion: { type: String, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married'], default: 'Single' },
  dob: { type: Date, required: true },
  salaryType: { type: String, required: true },
  salary: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  accountHolderName: { type: String },
  accountNumber: { type: String },
  bankName: { type: String },
  bankIdentifierCode: { type: String },
  branchLocation: { type: String },
  taxPayerId: { type: String },
  image: { type: String } // URL to the employee's image
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
