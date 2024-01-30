import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.js";

// Register a new user
router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

export default router;
