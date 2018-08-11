/**
 *  ogni schema rappresenta una collection di mongodb e
 *  definisce la forma del documento di una collection
 * @type {*|Mongoose}
 */

const mongoose = require('mongoose');

const PantrySchema = mongoose.Schema({

    name: String,
    code: Number,
    quantity: Number,
    category: String

});

module.exports= mongoose.model('products', PantrySchema);
