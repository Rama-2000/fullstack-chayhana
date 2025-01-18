import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!id || !name || !price || !description || !image) {
    return <div>Ошибка: данные о блюде не загружены</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="food-item" onClick={handleOpenModal}>
        <div className="food-item-img-container">
          <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id);
              }}
              src={assets.add_icon_white}
              alt="Добавить в корзину"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(id);
                }}
                src={assets.remove_icon_red}
                alt="Удалить из корзины"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(id);
                }}
                src={assets.add_icon_green}
                alt="Добавить еще"
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">{price} ₽</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img className="modal-image" src={`${url}/images/${image}`} alt={name} />
            <h2>{name}</h2>
            <p className="modal-description">{description}</p>
            <p className="modal-price">{price} ₽</p>
            <div className="modal-actions">
              <button className="modal-add-to-cart" onClick={() => addToCart(id)}>
                Добавить в корзину
              </button>
              <button className="modal-close" onClick={handleCloseModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;