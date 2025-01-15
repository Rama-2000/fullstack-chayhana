import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  if (!foodList || foodList.length === 0) {
    return <div>Блюда не загружены</div>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>{category || "Все категории"}</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          if (!category || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;