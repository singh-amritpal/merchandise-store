import { Router } from 'express';
import { check } from "express-validator";
import { getUserById } from '../controllers/user.js';
import { isSignedIn, isAuthenticated, isAdmin } from '../controllers/authentication.js'
import { getProductById, createProduct, uploadCSVProduct, getProduct, photo, removeProduct, updateProduct, getAllProducts, getAllUniqueCategories, getCSVProducts } from '../controllers/product.js'

var router = Router();

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, [
    check("name", "Name is required!").notEmpty(),
    check("description", "Product description is required!").notEmpty(),
    check("price", "Price is required!").notEmpty(),
    check("category", "Product category is required!").notEmpty(),
    check("availableUnits", "Unit availability is required").notEmpty()
], createProduct);

//router.get("/product/upload/:userId", isSignedIn, isAuthenticated, isAdmin, getCSVProducts);
router.post("/product/upload/:userId", isSignedIn, isAuthenticated, isAdmin, uploadCSVProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);

router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, [
    check("name", "Name is required!").notEmpty(),
    check("description", "Product description is required!").notEmpty(),
    check("price", "Price is required!").notEmpty(),
    check("category", "Product category is required!").notEmpty(),
    check("availableUnits", "Unit availability is required").notEmpty()
], updateProduct);

router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

export default router;