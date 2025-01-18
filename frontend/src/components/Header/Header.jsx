import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Закажи свое любимое блюдо здесь</h2>
        <button
          onClick={() => {
            const menuSection = document.getElementById("explore-menu");
            if (menuSection) {
              menuSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Меню
        </button>
      </div>
    </div>
  );
};

export default Header;