import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {}, // Пустое тело запроса
        {
          headers: { token }, // Передаем токен в заголовке
          withCredentials: true, // Убедитесь, что куки передаются
        }
      );

      if (response.data.success) {
        setData(response.data.data); // Устанавливаем данные заказов
      } else {
        setError("Не удалось загрузить заказы. Пожалуйста, попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка при загрузке заказов:", error);
      setError("Ошибка при загрузке заказов. Пожалуйста, проверьте соединение или войдите снова.");
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setError("Пожалуйста, войдите, чтобы просмотреть свои заказы.");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div className="loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-orders">
      <h2>Мои заказы</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Заказ" />
              <p>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>{order.amount} ₽</p>
              <p>Товаров: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <p>Способ оплаты: {order.paymentMethod}</p>
              <button onClick={fetchOrders}>Отследить заказ</button>
            </div>
          ))
        ) : (
          <p>Заказов не найдено.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;