var express = require('express');
var app = express.Router();

const customers = require('../controller/customer.controller.js');

// Create a new Customer
app.post('/', customers.create);

// Retrieve all Customer
app.get('/', customers.findAll);

// Retrieve a single Customer by Id
app.get('/:customerId', customers.findOne);

// Update a Customer with Id
app.put('/', customers.update);

// Delete a Customer with Id
app.delete('/:customerId', customers.delete);

module.exports = app;