const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    __id: String,
    bookingName: String,
    bookingSurname: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    roomNumber: Number,
    numberOfPeople: Number,
    otherNeeds: Array
}, {
    timestamps: true
});
module.exports = mongoose.model('customer', CustomerSchema);