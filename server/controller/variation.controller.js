const Variation = require('../model/variation.model.js');

exports.findAll = (req, res) => {
    Variation.find({})
        .then(variations => {
            res.json(variations);

        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

exports.addVariation = (req, res) => {
    console.log('contenuto dell input ' + req.body);
        const variation = new Variation(req.body);

        variation.save()
            .then(data => {
                res.json(data);
            }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });

};

exports.removeVariation = (req, res) => {
console.log("REEEEEQ" + req.params.id)


    Variation.findOneAndRemove({
        _id:  req.params.id
    }).then(variation => {
        res.json({msg: "Variation deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Variation not found with id " + req.params._id
            });
        }
        return res.status(500).json({
            msg: "Could not delete variation with id " + req.params._id
        });
    });
};
