import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Добавить товар" />
          <p>Добавить товар</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="Список товаров" />
          <p>Список товаров</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="Заказы" />
          <p>Заказы</p>
        </NavLink>
        <NavLink to="/completed-orders" className="sidebar-option">
          <img src={assets.order_icon} alt="Завершенные заказы" />
          <p>Завершенные заказы</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;