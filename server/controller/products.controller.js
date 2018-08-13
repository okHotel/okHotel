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
    console.log('inserting')
    const product = new Product(req.body);
    product.save()
        .then(data => {
            res.status(201).json({
                msg: 'product added successfully'
            })
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            msg: err.message
        });
    });

};

/**
 * metodo per aggiornare un document nella collection Products
 */
exports.updateProduct = (req, res) => {
        Product.findByIdAndUpdate(req.body._id, req.body, {new: true})
            .then(product => {
                console.log('Updating product')
                if (!product) {
                    return res.status(404).json({
                        msg: "Product not found with code1" + req.body.code
                    });
                }

                res.json(product);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        msg: "Product not found with code2 " + req.body.code
                    });
                }
                return res.status(500).json({
                    msg: "Error updating product with code3 " + req.body.code
                });
            });
};

exports.delete = (req, res) => {

    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    msg: "Product not found with id " + req.params.productId
                });
            }
            res.json({msg: "Product deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).json({
            msg: "Could not delete product with id " + req.params.productId
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


