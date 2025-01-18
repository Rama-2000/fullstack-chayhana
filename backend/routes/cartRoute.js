import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cartControler.js";
import authMiddleware from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleware, addToCart);
cartRoute.post("/remove", authMiddleware, removeFromCart);
cartRoute.post("/get", authMiddleware, getCart);
cartRoute.post("/clear", authMiddleware, clearCart); // Новый маршрут для очистки корзины

export default cartRoute;