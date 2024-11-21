import { useState } from "react";
import { FoodSearchResultDonutChart } from "./FoodSearchResultDonutChart";
import { Tabs } from "../../../components/shared/Tabs/Tabs";
import { useAddFood } from "../../../core/hooks/useFood";

export const FoodSearchResultDetail = ({ selectedFood, mealtype }) => {
  const { mutate: addFood, isLoading } = useAddFood();
  const [quantity, setQuantity] = useState(0);

  const {
    name = "알 수 없음",
    nutrient = [{}],
    defaultGram = 100,
  } = selectedFood;
  console.log("selectedFood11", selectedFood);
  const Tabs1 = () => {
    return (
      <div className="tab-input-container">
        <input
          className="tab-input"
          placeholder="인분 or 개수를 적어주세요."
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
      </div>
    );
  };

  const Tabs2 = () => {
    return (
      <div className="tab-input-container">
        <input
          className="tab-input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="g수를 적어주세요."
        ></input>
      </div>
    );
  };

  const items = [
    {
      title: `${defaultGram}g`,
      comp: <Tabs1 />,
    },
    {
      title: "g",
      comp: <Tabs2 />,
    },
  ];

  const handleAddFood = () => {
    if (isLoading) return; // 중복 클릭 방지
    addFood({
      food: selectedFood,
      mealtype,
      quantity: Number(quantity),
    });
  };

  return (
    <>
      <header className="FoodDetail-title">
        <h1>{name}</h1>
      </header>
      <section className="FoodDetail-nutrient">
        <article className="FoodDetail-nutrient__Car">
          <div>
            <p>{nutrient[0]?.Carbohydrate || 0}g</p>
            <p>탄수화물</p>
          </div>
        </article>
        <article className="FoodDetail-nutrient__Pro">
          <div>
            <p>{nutrient[0]?.Protein || 0}g</p>
            <p>단백질</p>
          </div>
        </article>

        <article className="FoodDetail-nutrient__Fat">
          <div>
            <p>{nutrient[0]?.Fat || 0}g</p>
            <p>지방</p>
          </div>
        </article>
        <FoodSearchResultDonutChart nutrient={nutrient[0]} />
      </section>
      <section className="FoodDetail-footer">
        <div>
          <Tabs items={items} className="FoodDetailTabs" />
        </div>
        <div className="FoodDetail-addButton">
          <button onClick={handleAddFood}>추가</button>
        </div>
      </section>
    </>
  );
};
