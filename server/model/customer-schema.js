//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const CustomerSchema = mongoose.Schema({
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
    otherNeeds: String
});

//Create a model using mongoose.model and export it
const Customer = module.exports = mongoose.model('customers_fede', CustomerSchema );

//BucketList.find() returns all the lists
module.exports.getCustomer = (bookingName, bookingSurname, callback) => {
    Customer.findOne({bookingSurname: bookingSurname}, callback);
}

//newList.updateCustomer is used to insert the document into MongoDB
module.exports.addCustomer = (newCustomer, callback) => {
    newCustomer.save(callback);
}

module.exports.updateCustomer = (customer, callback) => {
    Customer.update({bookingSurname: customer.bookingSurname}, customer, callback);
}

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteCustomer = (bookingName, bookingSurname, callback) => {
    let query = {bookingName: bookingName, bookingSurname: bookingSurname};
    Customer.remove(query, callback);
}
