import { signup, signin, signout, isSignedIn } from "../controllers/authentication.js";
import { Router } from 'express';
import { check } from "express-validator";

var router = Router();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

router.post("/signup", [
    check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password").matches(passwordRegex).withMessage("Password must be at-least 8 characters long with 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.")
], signup);

router.post("/signin", [
    check("email", "Email is required").isEmail(),
    check("password").notEmpty().withMessage("Password is required!")
], signin);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
});

export default router;