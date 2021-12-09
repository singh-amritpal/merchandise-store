import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';


const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f, reload = undefined }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name : "Name Unavailable";
    const cardDescription = product ? product.description : "Description Unavailable";
    const cardPrice = product ? product.price : "0.00";

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <button onClick={addToCart} className="btn btn-block btn-outline-success card-link">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                }} className="btn btn-block btn-outline-danger card-link" >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-dark shadow-sm p-3 mb-3 bg-white rounded" style={{ width: "100%" }}>
            <h5 className="card-title">{cardTitle}</h5>
            {getARedirect(redirect)}
            <ImageHelper product={product} />
            <div className="card-body">
                <p className="lead font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">${cardPrice}</p>
                <div className="row mb-2">
                    {showAddToCart(addtoCart)}
                </div>
                <div className="row">
                    {showRemoveFromCart(removeFromCart)}
                </div>
            </div>
        </div>
    );
};

export default Card;
