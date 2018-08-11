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

exports.create = (req, res) =>  {

    console.log("createeeee");

    /*MyModel.findOneAndUpdate(
        {date: date1}, // find a document with that filter
        modelDoc, // document to insert when nothing was found
        {upsert: true, new: true, runValidators: true}, // options
        function (err, doc) { // callback
            if (err) {
                // handle error
            } else {
                // handle document
            }
        }
    );*/
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
