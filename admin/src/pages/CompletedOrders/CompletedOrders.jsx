import React, { useEffect, useState } from "react";
import "./CompletedOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const CompletedOrders = ({ url }) => {
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchCompletedOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/completed`);
      if (response.data.success) {
        setCompletedOrders(response.data.data);
      } else {
        toast.error("Ошибка при загрузке завершенных заказов");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ошибка при загрузке завершенных заказов");
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <div className="completed-orders add">
      <h3>Завершенные заказы</h3>
      <div className="completed-order-list">
        {completedOrders.map((order, index) => (
          <div key={index} className="completed-order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="completed-order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p className="completed-order-item-name">{order.address.fullName}</p>
              <div className="completed-order-item-address">
                <p>{order.address.street + ", " + order.address.house}</p>
                <p>{order.address.city + ", " + order.address.apartment}</p>
                <p>
                  {order.address.entrance && `Подъезд: ${order.address.entrance}, `}
                  {order.address.floor && `Этаж: ${order.address.floor}, `}
                  {order.address.intercom && `Домофон: ${order.address.intercom}`}
                </p>
              </div>
              <p className="completed-order-item-phone">{order.address.phone}</p>
              <p className="completed-order-item-payment">
                Способ оплаты: {order.paymentMethod}
              </p>
              <p className="completed-order-item-comment">
                {order.address.comment && `Комментарий: ${order.address.comment}`}
              </p>
            </div>
            <p>Товаров: {order.items.length}</p>
            <p>{order.amount} ₽</p>
            <p className="completed-status">Статус: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedOrders;