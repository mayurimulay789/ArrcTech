// routes/supplierRoutes.js

const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/SupplierController');

// Define routes
router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
