import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="logo" src={assets.logo} alt="Логотип" />
        <p>Chayhana №1 Sultan</p>
      </div>
      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <img className="profile" src={assets.profile_image} alt="Профиль" />
      </div>
    </div>
  );
};

export default Navbar;
