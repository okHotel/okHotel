const express = require('express');
const app = express.Router();

const plans = require('../controller/plan.controller.js');


/**
 * la rotta per richiamare il metodo che mi prenda dal db imagePath + floor
 */
app.get('/', plans.findAll);

module.exports = app;