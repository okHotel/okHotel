var jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const Customer = require('../model/customer.model.js');

// FETCH all Customers
exports.findAll = (req, res) => {

    checkAuthorization(req);
    
    Customer.find({})
        .then(customers => {
            res.json(customers);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

// FIND a Customer
exports.findOne = (req, res) => {

    checkAuthorization(req);

    Customer.findById(req.params.customerId)
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            res.json(customer);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).json({
            msg: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};

// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it
    Customer.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            res.json(customer);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).json({
            msg: "Error updating customer with id " + req.params.customerId
        });
    });
};

// DELETE a Customer
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.params.customerId
                });
            }
            res.json({msg: "Customer deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).json({
            msg: "Could not delete customer with id " + req.params.customerId
        });
    });
};

function checkAuthorization(req) {
    var token;
    var payload;

    if (!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized'});
    }

    token = req.headers.authorization.split(' ')[1];
}