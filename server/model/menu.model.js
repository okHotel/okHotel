const mongoose = require('mongoose');

const Reservation = {
    roomNumber:Number,
    type: String,
    dish: String,
    quantity: Number,
    variations: []
}

const Note = {
    roomNumber: Number,
    text: String
}

const MenuSchema = mongoose.Schema({
    __id: String,
    date: Date,
    lunch_dishes: [],
    dinner_dishes: [],
    otherNotes: [],
    reservations: []
},{
    timestamps: true
});

module.exports = mongoose.model('menu', MenuSchema);
