import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editData, setEditData] = useState({ price: "", category: "" });

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Ошибка при загрузке списка товаров");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ошибка при загрузке списка товаров");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ошибка при удалении товара");
    }
  };

  const startEditing = (item) => {
    setEditingItem(item._id);
    setEditData({ price: item.price, category: item.category });
  };

  const saveChanges = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/update`, {
        id: foodId, // Ensure this is the correct ID
        price: editData.price, // Ensure this is the correct price
        category: editData.category, // Ensure this is the correct category
      });
      if (response.data.success) {
        await fetchList();
        setEditingItem(null);
        toast.success("Изменения сохранены");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ошибка при сохранении изменений");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Список всех товаров</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Изображение</b>
          <b>Название</b>
          <b>Категория</b>
          <b>Цена</b>
          <b>Действие</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            {editingItem === item._id ? (
              <>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                >
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
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                />
                <p onClick={() => saveChanges(item._id)} className="cursor">
                  Сохранить
                </p>
              </>
            ) : (
              <>
                <p>{item.category}</p>
                <p>{item.price} ₽</p>
                <p onClick={() => startEditing(item)} className="cursor">
                  Изменить
                </p>
              </>
            )}
            <p onClick={() => removeFood(item._id)} className="cursor">
              Удалить
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;