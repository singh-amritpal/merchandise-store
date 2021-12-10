// importing dependencies
import { } from "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import authRoutes from "./routes/authentication.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import braintreeRoute from "./routes/braintreepayment.js";
//import stripeRoutes from "./routes/stripepayment.js";

const app = express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    }, filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var uploads = multer({ storage: storage })

// setup the database and making the connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("DB CONNECTED")
    })
    .catch(() => {
        console.log("CONNECTION NOT SUCCESSFUL")
    });

//Middleswares
app.use(express.json());
app.use(fileUpload())
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", braintreeRoute);
//app.use("/api", stripeRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting the Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});