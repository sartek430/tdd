import express from "express";
import { UserController } from "../controllers/userControllers";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.registerUser.bind(userController));

export default router;
