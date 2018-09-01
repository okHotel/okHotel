var jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const Customer = require('../model/customer.model.js');

// FETCH all Customers
exports.findAll = (req, res) => {
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

    let authHeader = req.headers["authorization"];

    let token = authHeader.split(" ")[1];
    let payload = jwt.verify(token, jwtConfig.jwtSecretKey);

    if (req.params.customerId !== payload._id && payload.role !== 'admin') {
        return res.status(401).send({message: 'You are not authorized'});
    }

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

    let authHeader = req.headers["authorization"];

    let token = authHeader.split(" ")[1];
    let payload = jwt.verify(token, jwtConfig.jwtSecretKey);

    if (req.body._id !== payload._id && payload.role !== 'admin') {
        return res.status(401).send({msg: 'You are not authorized1'});
    }

    Customer.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer not found with id " + req.body._id
                });
            }
            res.json(customer);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.body._id
            });
        }
        return res.status(500).json({
            msg: "Error updating customer with id " + req.body._id
        });
    });
};

// DELETE a Customer
exports.delete = (req, res) => {
    let authHeader = req.headers["authorization"];

    let token = authHeader.split(" ")[1];
    let payload = jwt.verify(token, jwtConfig.jwtSecretKey);
    if (req.params.customerId !== payload._id && payload.role !== 'admin') {
        return res.status(401).send({message: 'You are not authorized'});
    }

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