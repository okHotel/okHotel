const mongoose = require('mongoose');

const Reservation = {
    roomNumber:Number,
    type: String,
    dish: String,
    quantity: Number
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
    reservations: [{Reservation}]
},{
    timestamps: true
});

module.exports = mongoose.model('menu', MenuSchema);
