var express = require('express');
var app = express.Router();

const reservation = require('../controller/reservation.controller.js');

// Retrieve all Customer
app.get('/', reservation.findAll);

// Retrieve a single Customer by Id
app.get('/:reservationId', reservation.findOne);

// Update a Customer with Id
app.put('/', reservation.update);

// Delete a Customer with Id
app.delete('/:reservationId', reservation.delete);

module.exports = app;