import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "useYourMerchantId",
    publicKey: "useYourPublicKey",
    privateKey: "useYourPrivateKey"
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

}