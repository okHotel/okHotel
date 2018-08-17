const mongoose = require('mongoose');

const Reservation = {
    roomNumber:Number,
    type: String,
    dish: String,
    quantity: Number
}


const MenuSchema = mongoose.Schema({
    __id: String,
    date: Date,
    lunch_dishes: [],
    dinner_dishes: [],
    otherNotes: {
        roomNUmber: Number,
        text: String
    },

    reservations: []
},{
    timestamps: true
});

module.exports = mongoose.model('menu', MenuSchema);
