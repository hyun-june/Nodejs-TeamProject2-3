import { FoodSearchResultDonutChart } from "./FoodSearchResultDonutChart";

export const FoodSearchResultDetail = () => {
  return (
    <>
      <header className="FoodDetail-title">
        <h1>사과</h1>
      </header>
      <section className="FoodDetail-nutrient">
        <article className="FoodDetail-nutrient__Car">
          <div>
            <p>24.2g</p>
            <p>탄수화물</p>
          </div>
        </article>
        <article className="FoodDetail-nutrient__Pro">
          <div>
            <p>0.6g</p>
            <p>단백질</p>
          </div>
        </article>

        <article className="FoodDetail-nutrient__Fat">
          <div>
            <p>0.4g</p>
            <p>지방</p>
          </div>
        </article>
        <FoodSearchResultDonutChart />
      </section>
    </>
  );
};
