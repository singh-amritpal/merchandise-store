import Product from '../models/product.js';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';

//middlewares
export function getProductById(req, res, next, id) {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: 'PRODUCT NOT FOUND'
                })
            }
            req.product = product;
            next();
        });
}

export function photo(req, res, next) {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

export function updateStock(req, res, next) {
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { availableUnits: -product.count, soldUnits: +product.count } }
            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: 'BULK OPERATION FAILED'
            });
        }
        next();
    });
}

//route functions
export function getProduct(req, res) {
    req.product.photo = undefined;
    return res.json(req.product);
}

export function createProduct(req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'UNABLE TO CREATE PRODUCT'
            })
        }

        //destructure fields
        const { name, description, price, category, availableUnits } = fields;

        if (!name || !description || !price || !category || !availableUnits) {
            return res.status(400).json({
                error: "ALL FIELDS ARE REQUIRED"
            });
        }

        let product = new Product(fields);

        //Handle file here
        if (file.photo) {
            if (file.photo.size > 4194304) {
                return res.status(400).json({
                    error: "FILE SIZE GREATER THAN 4MB"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: 'FAILED TO CREATE PRODUCT'
                });
            }
            res.json({ product });
        })
    });
}

export function uploadCSVProduct(req, res) {

}

export function updateProduct(req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: 'UNABLE TO UPDATE PRODUCT'
            })
        }

        //updating the product using lodash
        let product = req.product;
        product = _.extend(product, fields);

        //Handle file here
        if (file.photo) {
            if (file.photo.size > 4194304) {
                return res.status(400).json({
                    error: "FILE SIZE GREATER THAN 4MB"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, updatedProduct) => {
            if (err) {
                return res.status(400).json({
                    error: 'FAILED TO UPDATE PRODUCT'
                });
            }
            res.json({ updatedProduct });
        })
    });
}

export function removeProduct(req, res) {
    const product = req.product;

    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: 'FAILED TO REMOVE PRODUCT'
            });
        }
        res.json({ message: `${deletedProduct.name} successfully deleted` });
    })
}

export function getAllProducts(req, res) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'FAILED TO LOAD PRODUCTS'
                });
            }
            res.json({ products });
        });
}

export function getAllUniqueCategories(req, res) {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'NO CATEGORY FOUND'
            });
        }
        res.json({ category });
    });
}