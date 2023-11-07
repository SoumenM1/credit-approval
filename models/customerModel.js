const db = require('../config/database');

class Customer {
  constructor(customer) {
    this.first_name = customer.first_name;
    this.last_name = customer.last_name;
    this.age = customer.age;
    this.monthly_salary = customer.monthly_salary;
    this.phone_number = customer.phone_number;
  }

  static getAll(result) {
    db.query('SELECT * FROM customer_data', (err, res) => {
      if (err) result(null, err);
      result(null, res);
    });
  }

  static getById(id, result) {
    db.query('SELECT * FROM customer_data WHERE customer_id= ?', id, (err, res) => {
      if (err) result(null, err);
      result(null, res[0]);
    });
  }

  static create(newCustomer, result) {
    const approved_limit = Math.round(36 * newCustomer.monthly_salary / 100000) * 100000;

    const customerData = {
      first_name: newCustomer.first_name,
      last_name: newCustomer.last_name,
      age: newCustomer.age,
      monthly_salary: newCustomer.monthly_salary,
      phone_number: newCustomer.phone_number,
      approved_limit: approved_limit,
    };
    db.query('INSERT INTO customer_data SET ?', customerData, (err, res) => {
      if (err) result(null, err);
      result(null, { customer_id: res.insertId, name:customerData.first_name+" "+customerData.last_name,age:customerData.age,monthly_income:customerData.monthly_salary,approved_limit:customerData.approved_limit,phone_number:customerData.phone_number });
    });
  }
  static update(id, updatedCustomer, result) {
    db.query('UPDATE customer_data SET ? WHERE customer_id = ?', [updatedCustomer, id], (err, res) => {
      if (err) result(null, err);
      if (res.affectedRows === 0) {
        // If no rows were affected, the record was not found.
        result({ message: 'Customer not found' }, null);
        return;
      }
      result(null, { id, ...updatedCustomer });
    });
  }
  static delete(id, result) {
    db.query('DELETE FROM customer_data WHERE customer_id = ?', id, (err, res) => {
      if (err) result(null, err);
      if (res.affectedRows === 0) {
        // If no rows were affected, the record was not found.
        result({ message: 'Customer not found' }, null);
        return;
      }
      result(null, { message: 'Customer deleted' });
    });
  }

}

module.exports = Customer;
