import React, { useState, useEffect } from "react";
import "../style.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import BraintreeCheckout from "./BraintreeCheckout";

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart)
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {
                    products?.map((product, index) => {
                        return (
                            <Card key={index} product={product} removeFromCart={true} addtoCart={false} setReload={setReload} reload={reload} />
                        )
                    })
                }
            </div>
        )
    }

    return (
        <Base title="Your Cart" description="Welcome to the Merchandise Store" className="container bg-white p-4">
            <div className="row text-center">
                <div className="col-6">{products.length > 0 ? loadAllProducts(products) : (<h3>No Products in Cart</h3>)}</div>
                <div className="col-6">
                    <StripeCheckout products={products} setReload={setReload} />
                    {/* <BraintreeCheckout products={products} setReload={setReload} /> */}
                </div>
            </div>
        </Base >
    )
}

export default Cart;