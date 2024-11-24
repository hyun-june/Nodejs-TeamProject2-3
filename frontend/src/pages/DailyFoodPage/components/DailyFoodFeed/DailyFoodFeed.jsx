import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DailyFoodFeed = ({
  mealType,
  foods,
  mealCalories,
  onFoodClick,
  selectedDate,
}) => {
  return (
    <article className="DailyFood__Feed">
      <header className="DailyFood__Feed-title">{mealType}</header>
      <div className="DailyFood__Feed-content">
        {foods && foods.length > 0 ? (
          foods.map((food, index) => (
            <section
              key={index}
              className="DailyFood__Feed-content-box"
              onClick={() => onFoodClick(food)}
            >
              <div className="DailyFood__Feed-content-box-inner">
                <h3>{`${food.food} ${food.quantity}개`}</h3>
                <div className="DailyFood_Feed-content-box__explain">
                  <p>{food.quantity * food.defaultGram} g</p>
                  <p>{food.calories * food.quantity}Kcal</p>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div></div>
        )}{" "}
        <Link to={`/food/search/${mealType}?date=${selectedDate}`}>
          <section className="DailyFood__Feed-content-box">
            <button aria-label="음식 추가">
              <GoPlus />
            </button>
          </section>
        </Link>
      </div>
      <footer className="DailyFood__Feed-footer">
        <p className="DailyFood__Feed-totalCalorie-Num">
          {mealCalories} {/* 각 식사별 칼로리 */}
        </p>
        <p>Kcal</p>
      </footer>
    </article>
  );
};
