const express = require('express');
const app = express.Router();

const customers = require('../controller/authentication.controller.js');

// Create a new Customer
app.post('/', customers.create);

app.post('/login', customers.login);

module.exports = app;