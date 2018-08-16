const express = require('express');
const app = express.Router();

const customers = require('../controller/customer.controller.js');
const authController = require('../controller/authentication.controller');
// Create a new Customer is in authentication routes.

// Retrieve all Customer
app.get('/', authController.requireAuthBy(['admin']), customers.findAll);

// Retrieve a single Customer by Id
app.get('/:customerId/', authController.requireAuthBy(['customer', 'admin']), customers.findOne);

// Update a Customer with Id
app.put('/', customers.update, authController.requireAuthBy(['customer', 'admin']), customers.update);

// Delete a Customer with Id
app.delete('/:customerId', authController.requireAuthBy(['customer', 'admin']), customers.delete);

module.exports = app;
