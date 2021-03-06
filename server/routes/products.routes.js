/**
 * FUNZIONAMENTO:
 * quando viene fatta una chiamata http a local host 3000/pantry, =>
 * allora richiama uno dei metodi pantry.***
 */
const express = require('express');
const app = express.Router();
const product = require('../controller/products.controller.js');
const authController = require('../controller/authentication.controller');

/**
 * INSERIMENTO
 * se la ricerca lato client (per nome/codice) fallisce,
 * ricevo dal client i campi del prodotto (nome, categoria, quantità e codice)
 * e creo un nuovo record in db
 */

app.post('/', authController.requireAuthBy(['admin']), product.insertProduct);

/**
 * UPDATE
 * se la ricerca lato client (per nome) va a buon fine,
 * ricevo dal client il nome e la quantità con cui aggiornare il prodotto in db
 */
//app.put('/', product.findOneByNameAndUpdate);

/**
 * UPDATE
 * se la ricerca lato client (per codice) va a buon fine,
 * ricevo dal client il codice e la quantità con cui aggiornare il prodotto in db
 */
app.put('/', authController.requireAuthBy(['admin']), product.updateProduct);

app.get('/', authController.requireAuthBy(['admin']), product.findAll);

app.get('/:productId', authController.requireAuthBy(['admin']), product.findProduct);

app.delete('/:productId', authController.requireAuthBy(['admin']), product.delete);

module.exports = app;