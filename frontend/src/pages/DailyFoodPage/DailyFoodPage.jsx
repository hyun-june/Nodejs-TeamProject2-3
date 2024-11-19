import Slider from "react-slick";

import { DailyFoodCalender } from "./components/DailyFoodCalender/DailyFoodCalender";
import "./DailyFoodPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DailyFoodFeed } from "./components/DailyFoodFeed/DailyFoodFeed";
import { Header } from "../../components/shared/Header/Header";

export const DailyFoodPage = () => {
  const setting = {
    dots: false,
    infinite: false,
    slidesToShow: 1.3,
    slidesToScroll: 0.75,
    arrows: false,
    swipe: true,
  };

  const mealTypes = ["아침", "점심", "저녁", "간식"];

  return (
    <>
      <header>
        <Header backTo={-1} title={"식단"} />
      </header>
      <main className="DailyFood">
        <DailyFoodCalender />

        <div className="DailyFood__total-calorie">
          <div>
            <span>총 칼로리</span>
          </div>
          <div className="DailyFood__total-calorie__Num">
            <span>57</span>
            <span>kcal</span>
          </div>
        </div>
        <Slider {...setting}>
          {mealTypes.map((mealType) => (
            <DailyFoodFeed key={mealType} mealType={mealType} />
          ))}
        </Slider>
      </main>
    </>
  );
};
