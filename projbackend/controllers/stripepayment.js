// import Stripe from "stripe";
// import uuidv4 from "uuid";

// const stripe = new Stripe('sk_test_51K4nuCHgWSzK4vEJ9uMhBiGh4IEkrmu155SDvblVaAkj6uKVX2q6fYqB1OnM0wGCCC5re0xhqY1TM8PHTv282NmK00KOomnz5d');

// export function makePayment(req, res) {
//     const { products, authToken } = req.body;
//     console.log("PRODUCTS ", products);

//     let amount = 0;

//     products.map(p => {
//         amount = amount + p.price;
//     });

//     const idempotencyKey = uuidv4();

//     return stripe.customers.create({
//         email: authToken.email,
//         source: authToken.id
//     }).then(customer => {
//         stripe.charges.create({
//             amount: amount * 100,
//             currency: "CAD",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: "Sample Description",
//             shipping: {
//                 name: authToken.card.name,
//                 address: {
//                     line1: authToken.card.address_line1,
//                     line2: authToken.card.address_line2,
//                     city: authToken.card.address_city,
//                     country: authToken.card.country,
//                     postal_code: authToken.card.address_zip
//                 }
//             }
//         }, { idempotencyKey })
//             .then(result => res.status(200).json(result))
//             .catch(err => console.log(err))
//     })
// }