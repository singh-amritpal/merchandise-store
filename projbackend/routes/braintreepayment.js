import { Router } from 'express';
import { getUserById, pushOrderInPurchaseList } from '../controllers/user.js';
import { isSignedIn, isAuthenticated } from '../controllers/authentication.js'
import { updateStock } from '../controllers/product.js';
import { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } from '../controllers/order.js';
import { getToken, processPayment } from '../controllers/braintreepayment.js';

var router = Router();

//routes
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

export default router;