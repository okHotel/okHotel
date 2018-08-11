const express = require('express');
const app = express.Router();

const menu = require('../controller/menu.controller.js');

// Create a new Customer is in authentication routes.

// Retrieve all Customer
app.get('/', menu.findAll);

// Retrieve a single Customer by Id
app.get('/:date', menu.findOne);

//Update a Customer with Id
app.put('/', menu.create);

/*// Delete a Customer with Id
app.delete('/:customerId', customers.delete);
*/
module.exports = app;