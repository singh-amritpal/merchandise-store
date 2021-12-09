import { Router } from 'express';
import { check } from "express-validator";
import { getUserById, pushOrderInPurchaseList } from '../controllers/user.js';
import { isSignedIn, isAuthenticated, isAdmin } from '../controllers/authentication.js'
import { updateStock } from '../controllers/product.js';
import { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } from '../controllers/order.js';

var router = Router();

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//routes
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
router.get("/order/allOrders/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

export default router;