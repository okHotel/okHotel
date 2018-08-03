const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    _id: String,
    bookingName: String,
    bookingSurname: String,
    roomNumber: Number,
    numberOfPeople: Number,
    start: Date,
    end: Date
}, {strict: false});

module.exports = mongoose.model('booking', BookingSchema);
