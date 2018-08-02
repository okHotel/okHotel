const Customer = require('../model/customer.model.js');
const bcrypt   = require('bcrypt-nodejs');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(customer){
    return jwt.sign({ customer: customer }, authConfig.secret, {
        expiresIn: 10080
    });
}

function setCustomerInfo(request){
    return request;
}

// POST a Customer
exports.create = (req, res) => {
    // Create a Customer

    if(!req.body.username){
        return res.status(422).send({error: 'You must enter an username'});
    }
    if(!req.body.password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    Customer.findOne({username: req.body.username}, function(err, existingCustomer) {
        if(existingCustomer){
            return res.status(422).send({error: 'That username is already in use'});
        }

        const SALT_FACTOR = 5;
        bcrypt.genSalt(SALT_FACTOR, function(err, salt){

            if(err){
                return res.json( {
                    msg: err
                });
            }
            bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                if (err) {
                    return res.json( {
                        msg: err
                    });
                }
                const customer = new Customer(req.body);
                customer.password = hash;

                // Save a Customer in the MongoDB
                customer.save()
                    .then(data => {
                        const userInfo = setUserInfo(existingCustomer);

                        res.status(201).json({
                            token: 'JWT ' + generateToken(userInfo),
                            user: userInfo
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            msg: err.message
                        });
                    });
            });
        });
    });
};

exports.login = (req, res) => {
    Customer.findOne({username: req.body.username})
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer not found with username" + req.body.username
                });
            }
            bcrypt.compare(req.body.password, customer.password, function(err, isMatch){

                if(err){
                    return cb(err);
                } else {
                    if (isMatch) {

                        const customerInfo = setCustomerInfo(customer);

                        res.status(200).json({
                            token: 'JWT ' + generateToken(customerInfo),
                            customer: customerInfo
                        });

                        console.log(customer.username + ' you are logged in!');
                    }
                }
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with username " + req.body.username
            });
        }
        return res.status(500).json({
            msg: "Error retrieving Customer with username " + req.body.username
        });
    });
}

exports.roleAuthorization = function(roles){

    console.log(roles)

    return function(req, res, next){

        const customer = req.body;
        console.log(req.body)
        Customer.findById(customer._id, function(err, foundCustomer){

            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }

            if(roles.contains(foundCustomer.role)){
                return next();
            }

            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');

        });
    }
}