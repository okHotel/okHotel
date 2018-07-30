const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    __id: String,
    bookingName: String,
    bookingSurname: String,
    roomNumber: Number,
    numberOfPeople: Number,
    start: Date,
    end: Date,
});

module.exports = mongoose.model('reservation', ReservationSchema);
