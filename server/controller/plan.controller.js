


const Plan = require('../model/plan.model.js');

/**
 * creo un metodo che mi prenda dalla collection plan
 * tutte gli imagePath + floor presenti
 */

exports.findAll = (req, res) => {
    Plan.find({})
        .then(plans => {
            res.json(plans);

        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
    });
}
