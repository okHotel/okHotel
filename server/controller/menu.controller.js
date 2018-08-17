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
            msg: err.message
        });
    });
};

exports.update =  (req, res) => {

    console.log("update " + req.body);

    Menu.findByIdAndUpdate(req.body._id, req.body)
        .then(menu => {
            if(!menu) {
                return res.status(404).json({
                    msg: "Menu not found with id " + req.params._id
                });
            }
            res.json(menu);

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Menu not found with id " + req.params._id
            });
        }
        return res.status(500).json({
            msg: "Error updating menu with id " + req.params._id
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
            msg: err.message
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
                    msg: "Menu of " + date1 + "not found"
                });
            }
            res.json(menu);
        })
        .catch(err => {

            if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Menu of " + date1 + "not found"
            });
        }
        return res.status(500).json({
            msg: "Error retrieving Menu of " + date1
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
                msg: "Menu not found with date " + req.params.date
            });
        }
        res.json({msg: "Menu deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Menu not found with id " + req.params.date
            });
        }
        return res.status(500).json({
            msg: "Could not delete menu with id " + req.params.date
        });
    });
};