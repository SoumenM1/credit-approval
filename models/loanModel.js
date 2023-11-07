const db = require('../config/database');
const Customer = require('./customerModel');
class Loan {
  constructor(customer) {
  this.customer_id=customer.customer_id
  this.loan_amount = customer.loan_amount
  this.interest_rate= customer.interest_rate
  this.tenure = customer.tenure
  }

  static create(newCustomer, result) {
    const customerData = {
      first_name: newCustomer.first_name,
      last_name: newCustomer.last_name,
      age: newCustomer.age,
      monthly_salary: newCustomer.monthly_salary,
      phone_number: newCustomer.phone_number,
      approved_limit: approved_limit,
    };
    db.query('INSERT INTO loan_data SET ?', customerData, (err, res) => {
      if (err) result(null, err);
      result(null, { loan_id: res.insertId, });
    });
  }

  static getAll(result) {
    db.query('SELECT * FROM loan_data', (err, res) => {
      if (err) result(null, err);
      result(null, res);
    });
  }

  static getById(id, result) {
    db.query('SELECT * FROM loan_data WHERE loan_id = ?', id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length === 0) {
        result({ message: 'Loan not found' }, null);
        return;
      }
      const loan = res[0];
      Customer.getById(loan.customer_id, (err, customer) => {
        if (err) {
          result(err, null);
          return;
        }
  
        const customerData = {
          id: customer.customer_id,
          first_name: customer.first_name,
          last_name: customer.last_name,
          phone_number: customer.phone_number,
          age: customer.age,
        };
  
        const response = {
          loan_id: loan.loan_id,
          customer: customerData, 
          loan_amount: loan.loan_amount,
          interest_rate: loan.interest_rate,
          monthly_installment: loan.monthly_payment,
          tenure: loan.tenure,
        };
  
        result(null, response);
      });
    });
  } 
  }
  
  module.exports = Loan;
  