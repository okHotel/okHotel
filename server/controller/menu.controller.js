const Menu = require('../model/menu.model.js');

// POST a Menu
exports.create = (req, res) => {
    console.log("create " +req.body);

    // Create a Menu
    const menu = new Menu(req.body);

    // Save a Menu in the MongoDB
    menu.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    });
};

exports.update =  (req, res) => {

    console.log(req.body);

    Menu.findByIdAndUpdate(req.body._id, req.body)
        .then(menu => {
            if(!menu) {
                return res.status(404).json({
                    message: "Menu not found with id " + req.body._id
                });
            }
            res.json(menu);

        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Menu not found with id " + req.body._id
                });
            }
            return res.status(500).json({
                message: "Error updating menu with id " + req.body._id + err.toString()
            });
    });
}

// FETCH all menu
exports.findAll = (req, res) => {
    Menu.find({})
        .then(menu => {
            console.log(menu);
            res.json(menu);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FIND a menu
exports.findOne = (req, res) => {
    date1 =  req.params.date;
    Menu.findOne({
        date: date1
    })
        .then(menu => {
            if(!menu) {
                return res.status(404).json({
                    message: "Menu of " + date1 + " not found"
                });
            }
            res.json(menu);
        })
        .catch(err => {

            if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Menu of " + date1 + " not found"
            });
        }
        return res.status(500).json({
            message: "Error retrieving Menu of " + date1
        });
    });
};


exports.delete = (req, res) => {

    console.log(req.params.date);

    Menu.findOneAndRemove({
        date:  req.params.date
    }).then(menu => {
        if(!menu) {
            return res.status(404).json({
                message: "Menu not found with date " + req.params.date
            });
        }
        res.json({message: "Menu deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Menu not found with id " + req.params.date
            });
        }
        return res.status(500).json({
            message: "Could not delete menu with id " + req.params.date
        });
    });
};


// CastError: Cast to [string] failed for value "[{"roomNumber":132,"type":"lunch","quantity":3,"dish":"a2"},{"roomNumber":132,"type":"lunch","quantity":47,"dish":"a3"},{"roomNumber":132,"type":"lunch","quantity":1,"dish":"a3"}]" at path "reservations""