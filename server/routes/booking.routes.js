var express = require('express');
var app = express.Router();

const booking = require('../controller/booking.controller.js');

// Retrieve all Bookings
app.get('/', booking.findAll);

// Retrieve a single booking by Id
app.get('/roomsNumber', booking.findRoomsNumber);

// Retrieve a single booking by Id
app.get('/:bookingId', booking.findOne);

// Update a booking with Id
app.put('/', booking.update);

// Delete a booking with Id
app.delete('/:bookingId', booking.delete);

module.exports = app;