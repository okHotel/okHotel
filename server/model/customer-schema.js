//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const CustomerSchema = mongoose.Schema({
    bookingName: {
        type: String,
        required: true
    },
    bookingSurname: {
        type: String,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    username: String,
    password: String,
    otherNeeds: Array
});

//Create a model using mongoose.model and export it
const Customer = module.exports = mongoose.model('customers_fede', CustomerSchema );

//BucketList.find() returns all the lists
module.exports.getAllCustomers = (callback) => {
    Customer.find(callback);
}

//newList.save is used to insert the document into MongoDB
module.exports.addCustomer = (newCustomer, callback) => {
    newCustomer.save(callback);
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteCustomer = (bookingName, bookingSurname, callback) => {
    let query = {bookingName: bookingName, bookingSurname: bookingSurname};
    Customer.remove(query, callback);
}
