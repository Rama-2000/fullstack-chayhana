import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Получение всех незавершенных заказов
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Ошибка при загрузке заказов");
    }
  };

  // Обработчик изменения статуса заказа
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
  
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });
  
      if (response.data.success) {
        // Если статус изменен на "Доставлено", обновляем список заказов
        if (newStatus === "Delivered") {
          await fetchAllOrders(); // Обновляем список заказов
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Ошибка при обновлении статуса");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Страница заказов</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.fullName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ", " + order.address.house}</p>
                <p>{order.address.city + ", " + order.address.apartment}</p>
                <p>
                  {order.address.entrance && `Подъезд: ${order.address.entrance}, `}
                  {order.address.floor && `Этаж: ${order.address.floor}, `}
                  {order.address.intercom && `Домофон: ${order.address.intercom}`}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-payment">
                Способ оплаты: {order.paymentMethod}
              </p>
              <p className="order-item-comment">
                {order.address.comment && `Комментарий: ${order.address.comment}`}
              </p>
            </div>
            <p>Товаров: {order.items.length}</p>
            <p>{order.amount} ₽</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">В обработке</option>
              <option value="Out for delivery">Доставляется</option>
              <option value="Delivered">Доставлено</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;