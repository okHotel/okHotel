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
    lunch_dishes: [String],
    dinner_dishes: [String],
    otherNotes: {
        roomNUmber: Number,
        text: String
    },

    reservations: [Reservation]
},{
    timestamps: true
});

module.exports = mongoose.model('menu', MenuSchema);
