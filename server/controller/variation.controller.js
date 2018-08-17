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

        variation.save();

};

exports.removeVariation = (req, res) => {

};
