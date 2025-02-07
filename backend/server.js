import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

// Инициализация приложения Express
const app = express();
const port = process.env.PORT || 4000; // Используем порт из переменных окружения или 4000 по умолчанию

// Middleware
app.use(express.json()); // Для обработки JSON-запросов
app.use(cookieParser()); // Для работы с cookies
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://frontend-chayhana.onrender.com", "https://front-admin-chayhana.onrender.com/"], // Разрешаем запросы с указанных доменов
    credentials: true, // Разрешаем передачу cookies
  })
);

// Подключение к базе данных
connectDB();

// Маршруты
app.use("/api/food", foodRouter); // Маршруты для работы с едой
app.use("/images", express.static("uploads")); // Статические файлы (изображения)
app.use("/api/user", userRouter); // Маршруты для работы с пользователями
app.use("/api/cart", cartRoute); // Маршруты для работы с корзиной
app.use("/api/order", orderRouter); // Маршруты для работы с заказами

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack); // Логируем ошибку
  res.status(500).json({ success: false, error: "Ошибка сервера" }); // Отправляем сообщение об ошибке
});

// Проверка работоспособности API
app.get("/", (req, res) => {
  res.send("API Working"); // Простой ответ для проверки работы сервера
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`); // Логируем запуск сервера
});
