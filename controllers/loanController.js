const db = require('../config/database');
const Loan = require('../models/loanModel');

exports.checkEligibility = async (req, res) => {
  const { customer_id, loan_amount, interest_rate, tenure } = req.body;

res.send("hii")
};

exports.createLoan = (req,res)=>{
  const newCustomer = new Loan(req.body);
  Loan.create(newCustomer, (err, customer) => {
    if (!customer) return res.status(404).json({msg:'loan are not created'});;
    res.status(200).json(customer);
  });
}
exports.viewLoan =(req,res)=>{
  const loan_id = req.params.loan_id
  if(!loan_id) return res.status(400).json({msg:'missing params'})
  Loan.getById(loan_id, (err, customer) => {
    if (!customer) return res.status(404).json({msg:'Data not found'});
    res.status(200).json(customer);
  });
}
  exports.getAllLoan=(req,res)=>{
  Loan.getAll((err, customers) => {
    if (!customers) return res.status(404).json({msg:'Data not found'});;
    res.json(customers).status(200);
  });
  }

