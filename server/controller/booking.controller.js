const Booking = require('../model/booking.model.js');

// FETCH all Reservations
exports.findAll = (req, res) => {
    Booking.find({})
        .then(reservation => {
            res.json(reservation);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

exports.findRoomsNumber = (req, res) => {
    Booking.find({}, 'roomNumber')
        .sort({roomNumber: 'asc'})
        .then(reservation => {
            res.json(reservation);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

// FIND a Booking
exports.findOne = (req, res) => {
    Booking.findOne({bookingName: req.params.bookingName, bookingSurname: req.params.bookingSurname})
        .then(reservation => {
            if(!reservation) {
                return res.status(404).json({
                    msg: "Booking not found for customer " + req.params.bookingName + " " + req.params.bookingSurname
                });
            }
            res.json(reservation);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Booking not found for customer " +  req.params.bookingName + " " + req.params.bookingSurname
            });
        }
        return res.status(500).json({
            msg: "Error retrieving booking for customer " +  req.params.bookingName + " " + req.params.bookingSurname
        });
    });
};

// UPDATE a Booking
exports.update = (req, res) => {
    // Find Booking and update it
    Booking.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then(reservation => {
            if(!reservation) {
                return res.status(404).json({
                    msg: "Booking not found with id " + req.params.reservationId
                });
            }
            res.json(reservation);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Booking not found with id " + req.params.reservationId
            });
        }
        return res.status(500).json({
            msg: "Error updating booking with id " + req.params.reservationId
        });
    });
};

// DELETE a Booking
exports.delete = (req, res) => {
    Booking.findByIdAndRemove(req.params.reservationId)
        .then(reservation => {
            if(!reservation) {
                return res.status(404).json({
                    msg: "Booking not found with id " + req.params.reservationId
                });
            }
            res.json({msg: "Booking deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Booking not found with id " + req.params.reservationId
            });
        }
        return res.status(500).json({
            msg: "Could not delete booking with id " + req.params.reservationId
        });
    });
};