/**
 *  ogni schema rappresenta una collection di mongodb e
 *  definisce la forma del documento di una collection
 * @type {*|Mongoose}
 */

const mongoose = require('mongoose');

const PlanSchema = mongoose.Schema({

    floor: String,
    imagePath: String

});

module.exports = mongoose.model('plan', PlanSchema);