const express = require('express');
const app = express.Router();

const Customer = require('../model/customer.model.js');
const bcrypt   = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// POST a Customer
exports.create = (req, res, next) => {
    // Create a Customer

    const SALT_FACTOR = 5;
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){

        if(err){
            return next(err);
        }
        bcrypt.hash(req.body.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            const customer = new Customer(req.body);
            customer.password = hash;

            // Save a Customer in the MongoDB

            var payload;

            if (err) {
                return next(err);
            }

            payload = {
                sub: customer.username,
                role: customer.role
            };
            res.status(200).json({
                customer: customer,
                token: jwt.sign(payload, config.jwtSecretKey, {expiresInMinutes: 60})
            });

            customer.save()
                .then(data => {
                    res.json(data);
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        msg: err.message
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
                            sub: customer.username,
                            role: customer.role
                        };

                        res.status(200).json({
                            customer: { username: customer.username, role: customer.role},
                            token: jwt.sign(payload, jwtConfig.jwtSecretKey, {
                                algorithm: 'HS256',
                                expiresIn: 120,
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

exports.auth = function(role){

    return function(req, res, next){

        console.log(req);

        var token;
        var payload;

        console.log(req.headers.authorization)

        if (!req.headers.authorization) {
            return res.status(401).send({message: 'You are not authorized'});

        }

        token = req.headers.authorization.split(' ')[1];

        try {
            payload = jwt.verify(token, config.jwtSecretKey);
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                res.status(401).send({message: 'Token Expired'});
            } else {
                res.status(401).send({message: 'Authentication failed'});
            }
            return;
        }

        if (!role || role === payload.role) {
            //pass some user details through in case they are needed
            req.customer = {
                customer: payload.sub,
                role: payload.role
            };
            next();
        } else {
            res.status(401).send({message: 'You are not authorized'});
        }
    }};

