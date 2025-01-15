import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  // Восстановление корзины из localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCartItems(savedCart);
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Восстановление токена из cookies при загрузке страницы
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(`${url}/api/user/check-auth`, {
          withCredentials: true, // Убедитесь, что куки передаются
        });
  
        if (response.data.success) {
          setToken(response.data.token); // Восстанавливаем токен
          console.log("Token restored:", response.data.token);
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    };

    fetchToken();
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
            headers: { token }, // Передаем токен в заголовке
            withCredentials: true, // Убедитесь, что куки передаются
          }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };
  
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
              headers: { token }, // Передаем токен в заголовке
              withCredentials: true, // Убедитесь, что куки передаются
            }
          );
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
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
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider