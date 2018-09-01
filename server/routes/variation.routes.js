const express = require('express');
const app = express.Router();

const variations = require('../controller/variation.controller.js');
const authController = require('../controller/authentication.controller');

app.get('/', authController.requireAuthBy(['customer', 'admin']), variations.findAll);

app.put('/', authController.requireAuthBy(['customer', 'admin']), variations.addVariation);

app.delete('/:id', authController.requireAuthBy(['customer', 'admin']), variations.removeVariation);



module.exports = app;