const db = require('../config/database');
const Customer = require('../models/customerModel');

// Get all customers
exports.getAllCustomers = (req, res) => {
  Customer.getAll((err, customers) => {
    if (!customers) return res.status(404).json({msg:'Data not found'});;
    res.json(customers).status(200);
  });
};

// Get a customer by ID
exports.getCustomerById = (req, res) => {
  const id = req.params.id;
  if(!id) return res.status(400).json({msg:'missing params'})
  Customer.getById(id, (err, customer) => {
    if (!customer) return res.status(404).json({msg:'Data not found'});
    res.status(200).json(customer);
  });
};

// Create a new customer
exports.createCustomer = (req, res) => {
  const newCustomer = new Customer(req.body);
  Customer.create(newCustomer, (err, customer) => {
    if (!customer) return res.status(404).json({msg:'customer are not created'});;
    res.status(200).json(customer);
  });
};

// Update a customer
exports.updateCustomer = (req, res) => {
  const id = req.params.id;
  if(!id) return res.status(400).json({msg:'missing params'})
  const updatedCustomer = new Customer(req.body);
  Customer.update(id, updatedCustomer, (err, customer) => {
    if (!customer) return res.status(404).json({msg:'Data not update'});;
    res.status(200).json(customer);
  });
};

// Delete a customer
exports.deleteCustomer = (req, res) => {
  const id = req.params.id;
  if(!id) return res.status(400).json({msg:'missing params'})
  Customer.delete(id, (err, customer) => {
    if (err) throw err;
    res.status(200).json({ message: 'Customer deleted' });
  });
};
