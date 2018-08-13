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

    if(checkVariation(req.type())) {

        const variation = new Variation(req.body);

        variation.save();
    }

};

exports.removeVariation = (req, res) => {

};

exports.checkVariation = (variation) => {
    const regex = '^[0-9]*$';

    return variation.size() != 0 && regex.test(variation);
}