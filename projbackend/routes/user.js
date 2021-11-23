import express from "express";
import { Router } from 'express';
import { check } from "express-validator";
import { getUserById, getUser, updateUser, userPurchaseList } from "../controllers/user.js";
import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/authentication.js";

var router = Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);


export default router;