const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { department, designation, shift, ...rest } = req.body;

    // Handling image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.location; // S3 URL for the image
    }

    const employee = new Employee({
      department,
      designation,
      shift,
      imageUrl,
      ...rest
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { department, designation, shift, ...rest } = req.body;

    // Handling image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.location; // S3 URL for the image
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { department, designation, shift, imageUrl, ...rest },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};