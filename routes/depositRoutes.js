// routes/depositRoutes.js
const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

router.get('/', depositController.getDeposits);
router.post('/', depositController.createDeposit);
router.put('/:id', depositController.updateDeposit);
router.delete('/:id', depositController.deleteDeposit);

module.exports = router;
