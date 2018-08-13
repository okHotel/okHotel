const express = require('express');
const app = express.Router();
const Customer = require('../model/customer.model.js');
const bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

function generateToken(customer){
    return jwt.sign({ customer: customer }, authConfig.secret, {
        expiresIn: 10080
    });
}

function setCustomerInfo(request){
    return request;
}

// POST a Customer
exports.create = (req, res, next) => {
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

exports.login = (req, res, next) => {
    Customer.findOne({username: req.body.username})
        .then(customer => {
            if(!customer) {
                return res.status(404).json({
                    msg: "Customer not found with username" + req.body.username
                });
            }
            bcrypt.compare(req.body.password, customer.password, function(err, isMatch){

                let payload;

                if (err) {
                    return next(err);
                }

                if (!isMatch) {
                    res.status(401).send({message: 'Invalid email or password.'});
                    return;
                }

                if(err){
                    return cb(err);
                } else {
                    if (isMatch) {
                        payload = {
                            _id: customer._id,
                            sub: customer.username,
                            role: customer.role
                        };

                        let expiry = new Date();
                        expiry.setDate(expiry.getDate() + 1); // Il token scade dopo 1 giorno

                        res.status(200).json({
                            customer: { username: customer.username, role: customer.role},
                            token: jwt.sign(payload, jwtConfig.jwtSecretKey, {
                                algorithm: 'HS256',
                                expiresIn: parseInt(expiry.getTime() / 1000),
                            })
                        });

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
};

exports.requireAuthBy = function(roles){

    return function(req, res, next){

        var token;
        var payload;
        let authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).send({message: 'You are not authorized'});
        }

        token = authHeader.split(" ")[1];
        try {
            payload = jwt.verify(token, jwtConfig.jwtSecretKey);

            if (roles.indexOf(payload.role) > -1) {
                //pass some user details through in case they are needed
                req.customer = {
                    customer: payload.sub,
                    role: payload.role
                };
                next();
            } else {
                res.status(401).send({message: 'You are not authorized'});
            }
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res.status(401).send({message: 'Token Expired'});
            } else {
                res.status(401).send({message: e});
            }
        }


    }};