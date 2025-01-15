import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cookieParser()); // Подключаем cookie-parser
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Укажите ваш фронтенд
    credentials: true, // Разрешаем передачу cookies
  })
);

// Подключение к базе данных
connectDB();

// Маршруты
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Ошибка сервера" });
});

// Проверка работоспособности API
app.get("/", (req, res) => {
  res.send("API Working");
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});