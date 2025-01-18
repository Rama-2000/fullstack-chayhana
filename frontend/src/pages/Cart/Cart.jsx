import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, foodList, addToCart, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  if (!cartItems || !foodList) {
    return <div>Корзина не загружена</div>;
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Товары</p>
          <p>Название</p>
          <p>Цена</p>
          <p>Количество</p>
          <p>Итого</p>
        </div>
        <br />
        <hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.price} ₽</p>
                  <div className="quantity-control">
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    <span>{cartItems[item._id]}</span>
                    <button onClick={() => addToCart(item._id)}>+</button>
                  </div>
                  <p>{item.price * cartItems[item._id]} ₽</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Итого в корзине</h2>
          <div>
            <div className="cart-total-detailes">
              <p>Подитог</p>
              <p>{getTotalCartAmount()} ₽</p>
            </div>
            <hr />
            <div className="cart-total-detailes">
              <p>Доставка</p>
              <p>300 ₽</p>
            </div>
            <hr />
            <div className="cart-total-detailes">
              <b>Общая сумма</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 300} ₽</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>Оформить заказ</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Если у вас есть промокод, введите его здесь</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Промокод" />
              <button>Применить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;