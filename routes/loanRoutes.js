const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Check loan eligibility and approve loans
router.get('/', loanController.getAllLoan);
router.post('/check-eligibility', loanController.checkEligibility);
router.post('/create-loan',loanController.createLoan)
router.get('/view-loan/:loan_id',loanController.viewLoan)

module.exports = router;
