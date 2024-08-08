const express = require('express');
const router = express.Router();
const purchaseControllers = require('../controllers/purchaseControllers.js'); // Adjust the path as needed

// Define routes
router.post('/invoices', purchaseControllers.createInvoice);
router.get('/invoices', purchaseControllers.getAllInvoices);
router.get('/invoices/:id', purchaseControllers.getInvoiceById);
router.put('/invoices/:id', purchaseControllers.updateInvoice);
router.delete('/invoices/:id', purchaseControllers.deleteInvoice);

module.exports = router;



