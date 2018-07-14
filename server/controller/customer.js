// Require the express package and use express.Router()
const express = require('express');
const router = express.Router();

const customer = require('../model/customer-schema');

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    customer.getAllCustomers((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();

        }
    });
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
    console.log(newCustomer)
    console.log(req.body)
    customer.addCustomer(newCustomer,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Added successfully."});

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.

router.delete('/:bookingName-:bookingSurname', (req,res,next)=> {
    //access the parameter which is the id of the item to be deleted
    let bookingName = req.params.bookingName;
    let bookingSurname = req.params.bookingSurname
    //Call the model method deleteListById
    customer.deleteCustomer(bookingName, bookingSurname,(err,list) => {
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
