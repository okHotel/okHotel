const express = require('express');
const app = express.Router();

const menu = require('../controller/menu.controller.js');
const authController = require('../controller/authentication.controller');

// Create a new Customer is in authentication routes.

// Retrieve all Menu
app.get('/', authController.requireAuthBy(['admin']), menu.findAll);

//Update a Menu with Id
app.put('/create', authController.requireAuthBy(['admin']), menu.create);

//Update a Menu with Id
app.put('/update', authController.requireAuthBy(['admin']), menu.update);

// Retrieve a single Menu by Id
app.get('/:date', authController.requireAuthBy(['customer', 'admin']), menu.findOne);

// Delete a Menu with a Date
app.delete('/:date', authController.requireAuthBy(['admin']), menu.delete);

module.exports = app;