import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DailyFoodFeed = ({ mealType }) => {
  return (
    <article className="DailyFood__Feed">
      <header className="DailyFood__Feed-title">{mealType}</header>
      <section className="DailyFood__Feed-content-box">
        <div className="DailyFood__Feed-content-box-inner">
          <h3>사과</h3>
          <div className="DailyFood_Feed-content-box__explain">
            <p>1개 평균 크기 100g</p>
            <p>57Kcal</p>
          </div>
        </div>
      </section>
      <section className="DailyFood__Feed-content-box">
        <button aria-label="음식 추가">
          <Link to={`/food/search/${mealType}`}>
            <GoPlus />
          </Link>
        </button>
      </section>
      <footer className="DailyFood__Feed-footer">
        <p className="DailyFood__Feed-totalCalorie-Num">57</p>
        <p>Kcal</p>
      </footer>
    </article>
  );
};
