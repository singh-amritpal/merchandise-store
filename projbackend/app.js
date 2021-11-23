// importing dependencies
import { } from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authentication.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";

const app = express();

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
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting the Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});

