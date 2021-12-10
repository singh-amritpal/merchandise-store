import { API } from "../../backend";

export const getBToken = (userId, authToken) => {
    return fetch(`${API}/payment/gettoken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        }
    }).then(response => {
        return response.json()
    })
        .catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userId}`, {
        method: "POST",
        headers: {
            Accept: "applicatiojn/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err))
}