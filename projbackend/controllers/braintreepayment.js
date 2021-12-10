import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: '78cbfs28qkf3n7tn',
    publicKey: 'wf79bfhjdg57g4df',
    privateKey: 'ff05e0adc8b4ec8e4bd3d8b64262146e'
});

export function getToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    });
}

export function processPayment(req, res) {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
}