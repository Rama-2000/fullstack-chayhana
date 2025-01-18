import orderModel from "../models/orderModel.js";
import CompletedOrderModel from "../models/completedOrderModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import schedule from "node-schedule";
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


// Получение всех незавершенных заказов
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ isCompleted: false }); // Только незавершенные заказы
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

    // Находим заказ
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Заказ не найден" });
    }

    // Если статус "Доставлено", устанавливаем его и добавляем временную метку
    if (status === "Delivered") {
      order.status = "Delivered";
      order.deliveredAt = new Date(); // Устанавливаем текущую дату
      await order.save();

      // Планируем перемещение заказа через 5 минут
      const moveTime = new Date(Date.now() + 5 * 60 * 1000); // 5 минут в миллисекундах
      schedule.scheduleJob(moveTime, async () => {
        const completedOrder = new CompletedOrderModel(order.toObject()); // Копируем данные заказа
        await completedOrder.save(); // Сохраняем в коллекцию завершенных заказов
        await orderModel.findByIdAndDelete(orderId); // Удаляем из текущей коллекции
      });
    } else {
      // Если статус не "Доставлено", просто обновляем статус
      order.status = status;
      await order.save();
    }

    res.json({ success: true, message: "Статус обновлен" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Ошибка при обновлении статуса" });
  }
};

// Получение завершенных заказов
const getCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await CompletedOrderModel.find({}); // Получаем все завершенные заказы
    res.json({ success: true, data: completedOrders });
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    res.status(500).json({ success: false, message: "Ошибка при получении завершенных заказов" });
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
    const userId = decoded.id;

    // Получаем текущие заказы
    const currentOrders = await orderModel.find({ userId });

    // Получаем завершенные заказы
    const completedOrders = await CompletedOrderModel.find({ userId });

    // Фильтруем завершенные заказы: исключаем те, которые доставлены более 2 дней назад
    const filteredCompletedOrders = completedOrders.filter((order) => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 дня назад
      return order.deliveredAt >= twoDaysAgo; // Оставляем только заказы, доставленные менее 2 дней назад
    });

    // Объединяем текущие и отфильтрованные завершенные заказы
    const allOrders = [...currentOrders, ...filteredCompletedOrders];

    res.json({ success: true, data: allOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Ошибка при получении заказов пользователя" });
  }
};

export { placeOrder, listOrders, updateStatus, getCompletedOrders, userOrders };