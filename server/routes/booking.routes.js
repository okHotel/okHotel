var express = require('express');
var app = express.Router();

const booking = require('../controller/booking.controller.js');
const authController = require('../controller/authentication.controller');

// Retrieve all Bookings
app.get('/', authController.requireAuthBy(['admin']), booking.findAll);

// Retrieve a single booking by Id
app.get('/roomsNumber', booking.findRoomsNumber);

// Retrieve a single booking by Name and Surname
app.get('/:bookingSurname/:bookingName', booking.findOne);

// Update a booking with Id
app.put('/', authController.requireAuthBy(['admin']), booking.update);

// Delete a booking with Id
app.delete('/:bookingId', authController.requireAuthBy(['admin']), booking.delete);

module.exports = app;