import express from "express";
import { loginUser, registerUser, sendCode, checkAuth, logoutUser } from "../controllers/userControler.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/send-code", sendCode);
userRouter.get("/check-auth", checkAuth);
userRouter.post("/logout", logoutUser); // Новый маршрут для выхода

export default userRouter;