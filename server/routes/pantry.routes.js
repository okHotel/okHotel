/**
 * FUNZIONAMENTO:
 * quando viene fatta una chiamata http a local host 3000/pantry, =>
 * allora richiama uno dei metodi pantry.***
 */

const express = require('express');
const app = express.Router();
const pantry = require('../controller/pantry.controller.js');

/**
 * INSERIMENTO
 * se la ricerca lato client (per nome/codice) fallisce,
 * ricevo dal client i campi del prodotto (nome, categoria, quantità e codice)
 * e creo un nuovo record in db
 */

app.post('/pantry', pantry.insertProduct);

/**
 * UPDATE
 * se la ricerca lato client (per nome) va a buon fine,
 * ricevo dal client il nome e la quantità con cui aggiornare il prodotto in db
 */
app.update('/pantry', pantry.findOneByNameAndUpdate);

/**
 * UPDATE
 * se la ricerca lato client (per codice) va a buon fine,
 * ricevo dal client il codice e la quantità con cui aggiornare il prodotto in db
 */
app.update('/pantry', pantry.findOneByCodeAndUpdate);


module.exports = app;