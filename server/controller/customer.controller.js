const Customer = require('../model/customer.model.js');
const bcrypt   = require('bcrypt-nodejs');

// POST a Customer
exports.create = (req, res) => {
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
                        console.log(customer.username + ' you are logged in!');
                        res.json(customer.username + ' you are logged in!');
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