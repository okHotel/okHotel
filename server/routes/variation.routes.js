const express = require('express');
const app = express.Router();

const variations = require('../controller/variation.controller.js');


app.get('/', variations.findAll);

app.put('/', variations.addVariation);

app.put('/', variations.removeVariation);

module.exports = app;