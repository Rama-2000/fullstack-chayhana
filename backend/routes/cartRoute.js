import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartControler.js";
import authMiddleware from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleware, addToCart); // Используем middleware для проверки токена
cartRoute.post("/remove", authMiddleware, removeFromCart); // Используем middleware для проверки токена
cartRoute.post("/get", authMiddleware, getCart); // Используем middleware для проверки токена

export default cartRoute;