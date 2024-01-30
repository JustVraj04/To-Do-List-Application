import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.js";

// Register a new user
router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

// Logout user
router.post("/logout", userController.logout);

export default router;
