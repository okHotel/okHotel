const Reservation = require('../model/reservation.model.js');

// FETCH all Reservations
exports.findAll = (req, res) => {
    Reservation.find({})
        .then(reservation => {
            res.json(reservation);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

// FIND a Reservation
exports.findOne = (req, res) => {
    Reservation.findById(req.params.reservationId)
        .then(reservation => {
            if(!reservation) {
                return res.status(404).json({
                    msg: "Reservation not found with id " + req.params.reservationId
                });
            }
            res.json(reservation);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Reservation not found with id " + req.params.reservationId
            });
        }
        return res.status(500).json({
            msg: "Error retrieving reservation with id " + req.params.reservationId
        });
    });
};

// UPDATE a Reservation
exports.update = (req, res) => {
    // Find Reservation and update it
    Reservation.findByIdAndUpdate(req.body._id, req.body, {new: true})
        .then(reservation => {
            if(!reservation) {
                return res.status(404).json({
                    msg: "Reservation not found with id " + req.params.reservationId
                });
            }
            res.json(reservation);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Reservation not found with id " + req.params.reservationId
            });
        }
        return res.status(500).json({
            msg: "Error updating reservation with id " + req.params.reservationId
        });
    });
};

// DELETE a Reservation
exports.delete = (req, res) => {
    Reservation.findByIdAndRemove(req.params.reservationId)
        .then(reservation => {
            if(!reservation) {
                return res.status(404).json({
                    msg: "Reservation not found with id " + req.params.reservationId
                });
            }
            res.json({msg: "Reservation deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Reservation not found with id " + req.params.reservationId
            });
        }
        return res.status(500).json({
            msg: "Could not delete reservation with id " + req.params.reservationId
        });
    });
};