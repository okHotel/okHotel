/**
 *  ogni schema rappresenta una collection di mongodb e
 *  definisce la forma del documento di una collection
 * @type {*|Mongoose}
 */

const mongoose = require('mongoose');

const PantrySchema = mongoose.Schema({
    __id: String,
    name: String,
    code: String,
    quantity: Number,
    category: String,
    unit: String

});

module.exports= mongoose.model('products', PantrySchema);
