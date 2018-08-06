const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    __id: String,
    date: String,
    lunch_dishes: [String],
    dinner_dishes: [String],
    otherNotes: {
        roomNUmber: Number,
        text: String
    },

    Reservations:{
        roomNUmber:Number,
        lunch: [Number],
        lunchVariation: [Number],

        dinner:[Number],
        dinnerVariations: [Number]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('menu', MenuSchema);