const express = require('express');
const app = express.Router();

const reservations = require('../controller/menu-statistic.controller');
//const authController = require('../controller/authentication.controller');

// Retrieve all Customer
app.get('/:date/:dish', reservations.findAll);

// Retrieve a single Customer by Id
// app.get('/:date', reservations.findOne);

module.exports = app;
