var jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const Menu = require('../model/menu.model.js');

// FETCH all Customers
exports.findAll = (req, res) => {
    Menu.find({})
        .then(menu => {
            res.json(menu);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

/*exports.findOne = (req, res) => {

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
};*/