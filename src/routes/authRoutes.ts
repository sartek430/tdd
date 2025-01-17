import express from "express";
import { AuthController } from "../controllers/authController";

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.loginUser.bind(authController));

export default router;
