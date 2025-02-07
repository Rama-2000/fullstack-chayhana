import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [user, setUser] = useState(null); // Добавляем состояние для пользователя
  const url = "https://fullstack-chayhana.onrender.com";

  // Восстановление корзины из localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCartItems(savedCart);
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Восстановление токена и данных пользователя при загрузке страницы
  useEffect(() => {
    const fetchTokenAndUser = async () => {
      try {
        const response = await axios.get(`${url}/api/user/check-auth`, {
          withCredentials: true,
        });
  
        if (response.data.success) {
          setToken(response.data.token); // Устанавливаем токен
          setUser(response.data.user); // Устанавливаем данные пользователя
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    };
  
    fetchTokenAndUser();
  }, []);

  // Добавление товара в корзину
  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: { token },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Удаление товара из корзины
  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 0) {
      const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
      setCartItems(updatedCart);

      if (token) {
        try {
          await axios.post(
            `${url}/api/cart/remove`,
            { itemId },
            {
              headers: { token },
              withCredentials: true,
            }
          );
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      }
    }
  };

  // Очистка корзины
  const clearCart = async () => {
    setCartItems({});
    localStorage.removeItem("cart");

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/clear`,
          {},
          {
            headers: { token },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  // Расчет общей суммы корзины
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Загрузка списка блюд
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchFoodList();
  }, []);

  // Значение контекста
  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
    url,
    token,
    setToken,
    user, // Передаем данные пользователя в контекст
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
