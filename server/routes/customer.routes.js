const express = require('express');
const app = express.Router();

const passportService = require('../config/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const authenticationController = require('../controller/authentication.controller');
const customers = require('../controller/customer.controller.js');

// Create a new Customer is in authentication routes.

// Retrieve all Customer
app.get('/', requireAuth, authenticationController.roleAuthorization(['admin']), customers.findAll);

// Retrieve a single Customer by Id
app.get('/:customerId', requireAuth, authenticationController.roleAuthorization(['customer, admin']), customers.findOne);

// Update a Customer with Id
app.put('/', requireAuth, authenticationController.roleAuthorization(['customer, admin']), customers.update);

// Delete a Customer with Id
app.delete('/:customerId', requireAuth, authenticationController.roleAuthorization(['admin']), customers.delete);

module.exports = app;