import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url, clearCart, user } = useContext(StoreContext);
  const [data, setData] = useState({
    fullName: "", // Имя и Фамилия
    city: "", // Город
    street: "", // Улица
    house: "", // Дом
    entrance: "", // Подъезд
    apartment: "", // Кв/офис
    floor: "", // Этаж
    intercom: "", // Домофон
    comment: "", // Комментарий к заказу
    phone: user?.phone || "", // Номер телефона с начальным значением
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Пожалуйста, войдите, чтобы оформить заказ.");
      return;
    }

    const orderItems = foodList
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod,
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: { token },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        clearCart(); // Очищаем корзину после успешного оформления заказа
        alert("Заказ успешно оформлен!");
        navigate("/myorders");
      }
    } catch (error) {
      console.error("Ошибка:", error.response ? error.response.data : error.message);
      alert("Ошибка при оформлении заказа. Пожалуйста, попробуйте снова.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Информация о доставке</p>
        <input
          required
          name="fullName"
          onChange={onChangeHandler}
          value={data.fullName}
          type="text"
          placeholder="Имя и Фамилия"
        />
        <input
          required
          name="city"
          onChange={onChangeHandler}
          value={data.city}
          type="text"
          placeholder="Город"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Улица"
        />
        <div className="multi-fields">
          <input
            required
            name="house"
            onChange={onChangeHandler}
            value={data.house}
            type="text"
            placeholder="Дом"
          />
          <input
            name="entrance"
            onChange={onChangeHandler}
            value={data.entrance}
            type="text"
            placeholder="Подъезд"
          />
        </div>
        <div className="multi-fields">
          <input
            name="apartment"
            onChange={onChangeHandler}
            value={data.apartment}
            type="text"
            placeholder="Кв/офис"
          />
          <input
            name="floor"
            onChange={onChangeHandler}
            value={data.floor}
            type="text"
            placeholder="Этаж"
          />
        </div>
        <input
          name="intercom"
          onChange={onChangeHandler}
          value={data.intercom}
          type="text"
          placeholder="Домофон"
        />
        <input
          name="comment"
          onChange={onChangeHandler}
          value={data.comment}
          type="text"
          placeholder="Комментарий к заказу"
        />
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Номер телефона"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Итого в корзине</h2>
          <div>
            <div className="cart-total-detailes">
              <p>Подитог</p>
              <p>{getTotalCartAmount()} ₽</p>
            </div>
            <hr />
            <div className="cart-total-detailes">
              <p>Стоимость доставки</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 400} ₽</p>
            </div>
            <hr />
            <div className="cart-total-detailes">
              <b>Общая сумма</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 400} ₽</b>
            </div>
          </div>
          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Оплата при получении
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Оплата картой (не онлайн)
            </label>
          </div>
          <button type="submit">Оформить заказ</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;