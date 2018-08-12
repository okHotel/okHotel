

const Product = require('../model/products.model.js');

/**
 * metodo per mostrare nella UI
 * tutti i prodotti della dispensa
 * @param req
 * @param res
 */
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
        res.status(422).send({error: 'Incorrect input for product'})
    }

};

/**
 * metodo per aggiornare un document nella collection Products
 */
exports.updateProduct = (req, res) => {


        Product.findByIdAndUpdate(req.code, req.body, {new: true})
            .then(product => {

                if (!product) {
                    return res.status(404).json({
                        msg: "Product not found with code" + req.params.code
                    });
                }

                if(!isQuantityAcceptable(req.quantity)) {
                    return res.status(404).json({
                        msg: "Product quantity is invalid" + req.params.code
                    });
                }

                res.json(product);
            }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Product not found with code " + req.params.code
                });
            }
            return res.status(500).json({
                msg: "Error updating product with code " + req.param.code
            });

        });


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
 * metodo per controllare che la nuova quantità inserita
 * per il prodotto contenga solo numeri
 * @param quantity
 */
exports.isQuantityAcceptable = (quantity) => {
    const regex = '^[0-9]+$';

    return regex.test(quantity);
}


