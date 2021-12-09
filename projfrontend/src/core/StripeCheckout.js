import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';

const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const authToken = isAuthenticated() && isAuthenticated().authToken;
    const userId = isAuthenticated && isAuthenticated().userId;

    const getTotal = () => {
        let amount = 0;

        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            //call further methods
        }).catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton stripeKey="pk_test_51K4nuCHgWSzK4vEJv1y0iniZT63PemYWGcmvLKiPrPRHcXE983oWI1iRwnMoeoZRbxLsH91XE6msGbxZ2sASFHZZ007SOLo3IT"
                token={makePayment}
                amount={getTotal() * 100}
                name="Pay With Stripe"
                shippingAddress
                billingAddress>
                <button className="btn btn-success rounded">Pay With Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning rounded">Sign In</button>
            </Link>
        );
    }

    return (
        <div>
            <h3>Stripe Ckeckout {getTotal()}</h3>
            <div className="shadow p-3 mb-3 bg-dark rounded">
                {showStripeButton()}
            </div>
        </div>
    );
}

export default StripeCheckout;
