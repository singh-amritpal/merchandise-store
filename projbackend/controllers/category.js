import Category from '../models/category.js';

export function getCategoryById(req, res, next, id) {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'CATEGORY NOT FOUND'
            })
        }
        req.category = category;
        next();
    });
}

export function createCategory(req, res) {
    const category = new Category(req.body);

    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'FAILED TO CREATE CATEGORY'
            });
        }
        res.json({ category });
    });
}

export function getCategory(req, res) {
    return res.json(req.category);
}

export function getAllCategories(req, res) {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'NO CATEGORIES FOUND'
            });
        }
        res.json(categories);
    });
}

export function updateCategory(req, res) {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: 'FAILED TO UPDATE CATEGORY'
            });
        }
        res.json({ updatedCategory });
    });
}

export function removeCategory(req, res) {
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'FAILED TO REMOVE CATEGORY'
            });
        }
        res.json({ message: `${category.name} successfully deleted` });
    })
}