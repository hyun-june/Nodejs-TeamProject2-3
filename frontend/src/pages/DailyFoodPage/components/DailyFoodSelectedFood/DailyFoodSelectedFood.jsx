import { useState } from "react";
import { FoodSearchResultDonutChart } from "../../../FoodSearchPage/components/FoodSearchResultDonutChart";
import { useUpdateDailyFood, useDeleteDailyFood } from "../../../../core/query/food";

export const DailyFoodSelectedFood = ({ nutrient, close }) => {
  const {
    food,
    defaultGram,
    nutrition,
    quantity: initialQuantity,
    foodId,
  } = nutrient;
  const { mutate: updateFood, isPending, error } = useUpdateDailyFood();
  const { mutate: deleteFood } = useDeleteDailyFood();

  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value); // 숫자 변환, 빈값은 기본값으로
    setQuantity(value);
  };

  const handleUpdateFood = () => {
    updateFood({ quantity, foodId });
    close();
  };

  const handleDeleteFood = () => {
    deleteFood({ foodId });
    close();
  };
  return (
    <>
      <header className="FoodDetail-title">
        <h1>{food}</h1>
      </header>
      <section className="FoodDetail-nutrient">
        <article className="FoodDetail-nutrient__Car">
          <div>
            <p>{nutrition?.Carbohydrate || 0}g</p>
            <p>탄수화물</p>
          </div>
        </article>
        <article className="FoodDetail-nutrient__Pro">
          <div>
            <p>{nutrition?.Protein || 0}g</p>
            <p>단백질</p>
          </div>
        </article>

        <article className="FoodDetail-nutrient__Fat">
          <div>
            <p>{nutrition?.Fat || 0}g</p>
            <p>지방</p>
          </div>
        </article>
        <FoodSearchResultDonutChart nutrient={nutrition} />
      </section>
      <section className="FoodDetail-footer">
        <input
          placeholder={`기본값 ${defaultGram}g`}
          value={quantity}
          onChange={handleQuantityChange}
          type="number"
          min="1"
          className="FoodDetail-input"
        ></input>
        <div className="FoodDetail-addButton FoodDetail-deleteButton">
          <button onClick={handleDeleteFood}>삭제</button>
        </div>
        <div className="FoodDetail-addButton">
          <button onClick={handleUpdateFood}>수정</button>
        </div>
      </section>
    </>
  );
};
