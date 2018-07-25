//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const customerSchema = mongoose.Schema({
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
    username: String,
    password: String,
    otherNeeds: Array
});

// Documents have a toObject method which converts the mongoose document into a plain javascript object
//customerSchema.set('toObject', { getters: true });

//Create a model using mongoose.model and export it
const registeredCustomer = module.exports = mongoose.model('customers_fede', customerSchema );
const bookedCustomer = mongoose.model('booked-customers', customerSchema );

//BucketList.find() returns all the lists
module.exports.getBookedCustomers = (callback) => {
    bookedCustomer.find(callback);
}

//BucketList.find() returns all the lists
module.exports.getCustomer = (bookingName, bookingSurname, callback) => {
    registeredCustomer.findOne({bookingSurname: bookingSurname}, callback);
}

//BucketList.find() returns all the lists
module.exports.getBookedCustomer = (bookingName, bookingSurname, callback) => {
    bookedCustomer.findOne({bookingSurname: bookingSurname}, callback);
}

//newList.updateCustomer is used to insert the document into MongoDB
module.exports.addCustomer = (newCustomer, callback) => {
    newCustomer.save(callback);
}

module.exports.updateCustomer = (toUpdateCustomer, callback) => {
    let query = { roomNumber: toUpdateCustomer.roomNumber};
    registeredCustomer.findOneAndUpdate( query, toUpdateCustomer, callback);
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteCustomer = (bookingSurname, callback) => {
    let query = { bookingSurname: bookingSurname };
    registeredCustomer.findOneAndDelete(query, callback);
}

// schema.set('toObject', { getters: true });