const express = require('express');
const app = express.Router();

const variations = require('../controller/variation.controller.js');
const authController = require('../controller/authentication.controller');

app.get('/', authController.requireAuthBy(['admin']), variations.findAll);

app.put('/', authController.requireAuthBy(['admin']), variations.addVariation);

app.delete('/:id', authController.requireAuthBy(['admin']), variations.removeVariation);



module.exports = app;