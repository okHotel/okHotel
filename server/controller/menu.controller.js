const Menu = require('../model/menu.model.js');

// POST a Menu
exports.create1 = (req, res) => {

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
    console.log(req.body.date);
//    res.send({status: 'SUCCESS'});

    Menu.findByIdAndUpdate(req.body._id, req.body, {new: true})
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
    Menu.findOne({date: date1})
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
