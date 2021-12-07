import React from 'react';
import ImageHelper from './helper/ImageHelper';


const Card = ({ product, addToCart = true, removeFromCart = false }) => {

    const cardTitle = product ? product.name : "Name Unavailable";
    const cardDescription = product ? product.description : "Description Unavailable";
    const cardPrice = product ? product.price : "0.00";


    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button onClick={() => { }} className="btn btn-block btn-outline-success card-link">
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button onClick={() => { }} className="btn btn-block btn-outline-danger card-link" >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div class="card text-dark shadow-sm p-3 mb-5 bg-white rounded" style={{ width: "100%" }}>
            <h5 class="card-title">{cardTitle}</h5>
            <ImageHelper product={product} />
            <div className="card-body">
                <p className="lead font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">${cardPrice}</p>
                <div className="row mb-2">
                    {showAddToCart(addToCart)}
                </div>
                <div className="row">
                    {showRemoveFromCart(removeFromCart)}
                </div>
            </div>
        </div>
    );
};

export default Card;
