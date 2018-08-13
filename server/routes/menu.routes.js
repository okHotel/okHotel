const express = require('express');
const app = express.Router();

const menu = require('../controller/menu.controller.js');

// Create a new Customer is in authentication routes.

// Retrieve all Menu
app.get('/', menu.findAll);

//Update a Menu with Id
app.put('/create', menu.create);

//Update a Menu with Id
app.put('/update', menu.update);

// Retrieve a single Menu by Id
app.get('/:date', menu.findOne);

// Delete a Menu with a Date
app.delete('/:date', menu.delete);

module.exports = app;