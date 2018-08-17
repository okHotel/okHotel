const mongoose = require('mongoose');

const VariationSchema = mongoose.Schema({
    __id: String,
    type: String

});

module.exports = mongoose.model('variation', VariationSchema);