import Order from "../models/order.js";

export function getOrderById(req, res, next, id) {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "NO ORDER FOUND"
                });
            }
            req.order = order;
            next();
        });
}

export function createOrder(req, res) {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "FAILED TO CREATE ORDER"
            });
        }
        res.json({ order });
    });
}

export function getAllOrders(req, res) {
    Order.find()
        .populate("user", "_id name")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "NO ORDERS FOUND"
                });
            }
            res.json({ orders });
        });
}

export function getOrderStatus(req, res) {
    return res.json(Order.schema.path("status").enumValues);
}

export function updateStatus(req, res) {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "UNABLE TO UPDATE ORDER STATUS"
                });
            }
            res.json({ order })
        }
    )
}