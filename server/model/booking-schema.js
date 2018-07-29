const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const bookingSchema = mongoose.Schema({
    bookingName: {
        type: String,
    },
    bookingSurname: {
        type: String,
    },
    roomNumber: {
        type: Number,
    },
    numberOfPeople: {
        type: Number,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date
    },
});

//Create a model using mongoose.model and export it
const bookedCustomer = module.exports = mongoose.model('booked-customers', bookingSchema );

//BucketList.find() returns all the lists
module.exports.getBookedCustomers = (callback) => {
    bookedCustomer.find(callback);
}

//BucketList.find() returns all the lists
module.exports.getBookedCustomer = (bookingName, bookingSurname, callback) => {
    bookedCustomer.findOne({bookingSurname: bookingSurname}, callback);
}

module.exports.getRoomsNumber = (callback) => {
    bookedCustomer.find({}, 'roomNumber', callback);
}