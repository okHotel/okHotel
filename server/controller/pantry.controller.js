

const Pantry = require('../model/pantry.model.js');

/**
 * metodo per inserire/aggiornare un document nella collection Pantry
 */
exports.insertProduct = (req, res) => {

    if(checkName(req.name) &&
        checkCode(req.code) &&
        checkCode(req.quantity) &&
        checkCode(req.category)) {

        const product = new Pantry(req.body);
        product.findByIdAndUpdate(req.code);

    }else{
        res.status(422).send({error: 'Uncorrect input for product'})
    }

};

/**
 * metodi per checcare l'input del prodotto
 */

exports.checkName = (name) => {
    const regex = '/^[A-Za-z]+$/';

    return name.size() != 0 && regex.test(name);
};

exports.checkCode = (code) => {
    const regex = '^[0-9]+$';

    return code.size() == 8 && regex.test(code);
};

exports.checkQuantity = (quantity) => {
    const regex = '^[0-9]+$';

    return code.size() != 0 && regex.test(quantity);
};

exports.checkCategory = (category) => {
    const regex = '/^[A-Za-z]+$/';

    return code.size() != 0 && regex.test(category);
};



/**
 * ricerca a buon fine: metodo per inserire un document nella collection Pantry,
 * ricevo dal client nome/codice e quantità con cui aggiornare il prodotto
 */
exports.findOneByNameAndUpdate = (req, res) => {

};

/**
 *ricerca fallisce: metodo per inserire un document nella collection Pantry,
 *ricevo dal client i campi del prodotto (nome, categoria, 	quantità e codice)
 */

exports.findOneByCodeAndUpdate = (req, res) => {

};

