var jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const Menu = require('../model/menu.model.js');

// FETCH all Customers
exports.findAll = (req, res) => {
    console.log(req.params.date, req.params.dish)

    Menu.aggregate([
        {
            $match: { $and : [ {date : new Date(req.params.date)}, {"reservations.dish" : req.params.dish} ]}
        }, {
            $group: {
                _id: null,
                total: {
                    $sum: 'reservation.quantity'
                }
            }
        }
    ])
/*
    Menu.find({date: req.params.date})
*/
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