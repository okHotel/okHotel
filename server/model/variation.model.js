const mongoose = require('mongoose');

const VariationSchema = mongoose.Schema({

    type: String

});

module.exports = mongoose.model('variation', VariationSchema);