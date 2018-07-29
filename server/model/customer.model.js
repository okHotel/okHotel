const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    __id: String,
    bookingName: String,
    bookingSurname: String,
    username: String,
    password: String,
    roomNumber: Number,
    numberOfPeople: Number,
    otherNeeds: Array
});

module.exports = mongoose.model('Customer', CustomerSchema);