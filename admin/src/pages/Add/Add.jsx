import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Салаты",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Салаты",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ошибка при добавлении блюда");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Загрузить изображение</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Загрузить"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Название товара</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Введите название"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Описание товара</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Введите описание"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Категория товара</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Салаты">Салаты</option>
              <option value="Горячие закуски">Горячие закуски</option>
              <option value="Десерты">Десерты</option>
              <option value="Напитки">Напитки</option>
              <option value="Супы">Супы</option>
              <option value="Холодные закуски">Холодные закуски</option>
              <option value="Гарниры">Гарниры</option>
              <option value="Мангал">Мангал</option>
              <option value="Японская кухня">Японская кухня</option>
              <option value="Фаст Фуд">Фаст Фуд</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Цена товара</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="20 ₽"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default Add;