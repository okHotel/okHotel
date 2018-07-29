const express = require('express');
const router = express.Router();
const booking = require('../model/booking-schema');

module.exports = router;

router.get('/',(req,res) => {

    booking.getBookedCustomers((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else if (lists) {
            console.log(lists);
            res.write(JSON.stringify({success: true, reservations:lists},null,2));
            res.end();
        } else {
            console.log(res);
            res.json({success:false});
        }
    });

});

router.get('/:bookingSurname', (req, res, next) => {
    let bookingSurname = req.params.bookingSurname;
    let bookingName = req.params.bookingName;

    booking.getBookedCustomer(bookingName, bookingSurname, (err, list) => {
        if(err) {
            res.json({message: `The customer has not booked yet`});
//            res.json({success:false, message: `Failed to get the customer. Error: ${err}`});
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
    });

})

router.get('/rooms/number', (req, res, next) => {

    booking.getRoomsNumber((err, roomsNumber) => {
        if(err) {
            res.json({success:false, message: `Failed to get the customer. Error: ${err}`});
        }
        else if(roomsNumber) {
            console.log(roomsNumber);
            res.write(JSON.stringify({success: true, roomsNumber:roomsNumber},null,2));
            res.end();
//            res.json({success:true, message: "Getted successfully"});
        } else {
            console.log(res);
            res.json({success:false});
            }
        });
})