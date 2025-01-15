import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.cookies.token; // Проверяем токен в заголовке или куках
  if (!token) {
    return res.status(401).json({ error: "Доступ запрещен" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Неверный токен" });
  }
};

export default authMiddleware;