const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

// CRUD routes for deposits
router.post('/', depositController.createDeposit);
router.get('/', depositController.getDeposits);
router.get('/:id', depositController.getDepositById);
router.put('/:id', depositController.updateDeposit);
router.delete('/:id', depositController.deleteDeposit);

module.exports = router;
