import User from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export function signup(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            location: errors.array()[0].param
        });
    }

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
}

export function signin(req, res) {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            location: errors.array()[0].param
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER EMAIL NOT FOUND"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "EMAIL AND PASSWORD DO NOT MATCH"
            })
        }

        //create auth Token
        const authToken = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("authToken", authToken, { expire: new Date() + 9999 });

        //send response to front end
        const { _id, name, email, role } = user;

        return res.json({ authToken, user: { _id, name, email, role } });
    });
}

export function signout(req, res) {
    res.clearCookie("authToken");

    res.json({
        message: "User Signed Out Successfully"
    });
}

//protected routes
export const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

//custom middlewares
export function isAuthenticated(req, res, next) {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
};

export function isAdmin(req, res, next) {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "ADMIN PRIVILEGES REQUIRED."
        })
    }
    next();
};