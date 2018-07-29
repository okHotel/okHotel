// Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const customer = require('../model/customer-schema');

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
/*
    customer.getBookedCustomers((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else if (lists) {
            console.log(lists);
            res.end();
        }
    });
*/
});

router.get('/:bookingSurname', (req,res,next)=> {
    let bookingName = req.params.bookingName;
    let bookingSurname = req.params.bookingSurname;

    console.log('into get');
    //Call the model method deleteListById
    customer.getCustomer(bookingName, bookingSurname,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to get the customer. Error: ${err}`});
        }
        else if(list) {
            console.log(list);
            res.json(list);
            res.end();
//            res.json({success:true, message: "Getted successfully"});
        } else {
            console.log(res);
            res.json({success:false});
        }

    })
});

router.post('/', (req,res,next) => {
    let newCustomer = new customer({
        bookingName: req.body.bookingName,
        bookingSurname: req.body.bookingSurname,
        roomNumber: req.body.roomNumber,
        numberOfPeople: req.body.numberOfPeople,
        username: req.body.username,
        password: req.body.password,
        otherNeeds: req.body.otherNeeds
    });
    console.log('newCustomer =>' + newCustomer);
    console.log('req.body =>');
    console.log(req.body);
    customer.addCustomer(newCustomer,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Added successfully."});

    });
});

/* UPDATE BOOK
router.put('/:id', function(req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});*/

router.put('/:bookingSurname', (req,res,next)=> {
    let bookingName = req.params.bookingName;
    let bookingSurname = req.params.bookingSurname;
    //Call the model method deleteListById
    let newCustomer = new customer({
        bookingName: req.body.bookingName,
        bookingSurname: req.body.bookingSurname,
        roomNumber: req.body.roomNumber,
        numberOfPeople: req.body.numberOfPeople,
        username: req.body.username,
        password: req.body.password,
        otherNeeds: req.body.otherNeeds
    });
    console.log(newCustomer);
    customer.updateCustomer(newCustomer,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to update the customer. Error: ${err}`});
        }
        else if(list) {
            console.log(list);
            res.json({success:true, message: "Updated successfully"});
        }
        else
            res.json({success:false});
    })
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.

router.delete('/:bookingSurname', (req,res,next)=> {
    //access the parameter which is the id of the item to be deleted
    let bookingName = req.params.bookingName;
    let bookingSurname = req.params.bookingSurname;
    //Call the model method deleteListById
    customer.deleteCustomer(bookingSurname,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    })
});

module.exports = router;
