import express from "express";
import { placeOrder, userOrders, listOrders, updateStatus, getCompletedOrders } from "../controllers/orderControler.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder); // Используем middleware для проверки токена
orderRouter.post("/userorders", authMiddleware, userOrders); // Используем middleware для проверки токена
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.get("/completed", getCompletedOrders);

export default orderRouter;