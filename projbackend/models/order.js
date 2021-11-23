import mongoose from "mongoose";           

const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: {
        type: String
    },
    count: {
        type: Number
    },
    price: {
        type: Number
    }
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const orderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    updated: {
        type: Date
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timstamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default { Order, ProductCart };