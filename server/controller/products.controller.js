

const Product = require('../model/products.model.js');

exports.findAll = (req, res) => {


    Product.find({})
        .sort({category: 'asc'})
        .then(pantry => {
            res.json(pantry);
        }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};

/**
 * metodo per inserire un document nella collection Pantry
 */
exports.insertProduct = (req, res) => {

    if(checkName(req.name) &&
        checkCode(req.code) &&
        checkCode(req.quantity) &&
        checkCode(req.category)) {

        const product = new Product(req.body);
        product.save();

    }else{
        res.status(422).send({error: 'Uncorrect input for product'})
    }

};

/**
 * metodo per aggiornare un document nella collection Pantry
 */
exports.updateProduct = (req, res) => {

/*
    if(checkCode(req.quantity)){
*/
        Product.findByIdAndUpdate(req.code, req.body, {new: true})
            .then(customer => {
                if(!customer) {
                    return res.status(404).json({
                        msg: "Product not found with code" + req.params.code
                    });
                }
                res.json(customer);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Product not found with code " + req.params.code
                });
            }
            return res.status(500).json({
                msg: "Error updating product with code " + req.param.code
            });
        });

/*
    }else{
        res.status(422).send({error: 'Uncorrect input for product'})
    }
*/

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
 *ricerca fallisce: metodo per inserire un document nella collection Pantry,
 *ricevo dal client i campi del prodotto (nome, categoria, 	quantità e codice)
 */

exports.findOneByCodeAndUpdate = (req, res) => {

};

