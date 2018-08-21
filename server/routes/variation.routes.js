const express = require('express');
const app = express.Router();

const variations = require('../controller/variation.controller.js');


app.get('/', variations.findAll);

app.put('/', variations.addVariation);

app.delete('/:id', variations.removeVariation);



module.exports = app;