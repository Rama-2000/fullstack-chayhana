import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Размещение заказа
const placeOrder = async (req, res) => {
  const { items, amount, address, paymentMethod } = req.body;

  try {
    const token = req.headers.token; // Получаем токен из заголовка
    if (!token) {
      return res.status(401).json({ error: "Доступ запрещен" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newOrder = new orderModel({
      userId: decoded.id,
      items,
      amount,
      address,
      paymentMethod,
      status: "Food Processing",
      payment: false,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(decoded.id, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in order" });
  }
};


// Получение всех заказов (для админ-панели)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Admin order list error" });
  }
};

// Обновление статуса заказа
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    if (status === "Delivered") {
      await orderModel.findByIdAndUpdate(orderId, { isCompleted: true });
    }

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Status update error" });
  }
};

// Получение выполненных заказов
const getCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await orderModel.find({ isCompleted: true });
    res.json({ success: true, data: completedOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching completed orders" });
  }
};

// Получение заказов пользователя
const userOrders = async (req, res) => {
  try {
    const token = req.headers.token; // Получаем токен из заголовка
    if (!token) {
      return res.status(401).json({ error: "Доступ запрещен" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await orderModel.find({ userId: decoded.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in userOrders" });
  }
};

export { placeOrder, listOrders, updateStatus, getCompletedOrders, userOrders };