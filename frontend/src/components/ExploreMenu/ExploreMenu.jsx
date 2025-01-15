import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  if (!menu_list || menu_list.length === 0) {
    return <div>Меню не загружено</div>;
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Наше меню</h1>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div key={index} onClick={() => setCategory(item.menu_name)} className='explore-menu-list-item'>
            <p className={category === item.menu_name ? "active" : ""}>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;