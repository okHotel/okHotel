const express = require('express');
const app = express.Router();

const plans = require('../controller/plan.controller.js');

app.get('/', plans.findAll());

module.exports = app;