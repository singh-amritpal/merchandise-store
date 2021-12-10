import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getBToken, processPayment } from "./helper/paymentbraintreehelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const BraintreeCheckout = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().userId;
    const authToken = isAuthenticated() && isAuthenticated().authToken;

    const getToken = (userId, authToken) => {
        getBToken(userId, authToken).then(info => {
            console.log("INFORMATION", info);
            if (info?.error) {
                setInfo({ ...info, error: info.error });
            } else {
                const clientToken = info.clientToken;
                setInfo({ clientToken });
            }
        });
    };

    const showBTDropIn = () => {
        return (
            <div>
                {info.clientToken !== null ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>
                            Buy
                        </button>
                    </div>
                ) : (
                    <h3>Please login or add something to cart</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        getToken(userId, authToken);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, authToken, paymentData)
                .then(response => {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESSFUL");
                    //TODO: empty the cart
                    //TODO: force reload
                })
                .catch(error => {
                    setInfo({ loading: false, success: false });
                    console.log("PAYMENT FAILED");
                });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3>Your bill is {getAmount()} $</h3>
            {showBTDropIn()}
        </div>
    );
};

export default BraintreeCheckout;
