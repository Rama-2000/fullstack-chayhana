import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post(`${url}/api/user/logout`, {}, { withCredentials: true });
      if (response.data.success) {
        setToken("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-main">
        <img src={assets.logo} alt="Logo" className="logo" />
        <h3>Chayhana №1 Sultan</h3>
      </Link>
      <div className="navbar-right">
        <div className="phone-number">
          <a href="tel:+79231300808">
            <img src={assets.phoneIcon} alt="Phone" />
            +7 (923) 130-08-08
          </a>
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </Link>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Войти</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Заказы</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Выйти</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;