import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    phone: "",
    password: "",
    code: "",
  });
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const sendCode = async () => {
    if (!data.phone) {
      setError("Введите номер телефона");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/user/send-code`, { phone: data.phone });
      if (response.data.success) {
        setCodeSent(true);
        setError("");
        setConfirmationCode(response.data.code);
      } else {
        setError(response.data.message || "Ошибка при отправке кода");
      }
    } catch (error) {
      console.error("Ошибка при отправке кода:", error);
      setError(error.response?.data?.message || "Ошибка при отправке кода. Попробуйте еще раз.");
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (!data.phone || !data.password) {
      setError("Введите номер телефона и пароль");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/user/login`,
        { phone: data.phone, password: data.password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setToken(response.data.token);
        setShowLogin(false);
        window.location.reload();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      setError(error.response?.data?.message || "Ошибка при входе. Попробуйте еще раз.");
    }
  };

  const onRegister = async (event) => {
    event.preventDefault();
    if (!data.name || !data.phone || !data.password || !data.code) {
      setError("Все поля обязательны");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/user/register`,
        { name: data.name, phone: data.phone, password: data.password, code: data.code },
        { withCredentials: true }
      );

      if (response.data.success) {
        setToken(response.data.token);
        setShowLogin(false);
        window.location.reload();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setError(error.response?.data?.message || "Ошибка при регистрации. Попробуйте еще раз.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={currState === "Login" ? onLogin : onRegister} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <>
              <input
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="tel"
                placeholder="Ваш номер телефона"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Пароль"
                required
              />
            </>
          ) : (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Ваше имя"
                required
              />
              <input
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="tel"
                placeholder="Ваш номер телефона"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Создайте пароль"
                required
              />
              <input
                name="code"
                onChange={onChangeHandler}
                value={data.code}
                type="text"
                placeholder="Введите код подтверждения"
                required
              />
            </>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
        {currState === "Sign Up" && codeSent && (
          <p className="confirmation-code">
            Код подтверждения: <strong>{confirmationCode}</strong>
          </p>
        )}
        {currState === "Sign Up" ? (
          <div className="buttons">
            <button type="button" onClick={sendCode} className="send-code-button">
              Получить код
            </button>
            <button
              type="submit"
              className="register-button"
              disabled={!codeSent}
            >
              Зарегистрироваться
            </button>
          </div>
        ) : (
          <button type="submit" className="login-button">
            Войти
          </button>
        )}
        {currState === "Login" ? (
          <p>
            Нет аккаунта?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Зарегистрируйтесь</span>{" "}
          </p>
        ) : (
          <p>
            Уже есть аккаунт?{" "}
            <span onClick={() => setCurrState("Login")}>Войдите</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;