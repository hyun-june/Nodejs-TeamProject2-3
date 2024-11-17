import Slider from "react-slick";

import { DailyFoodCalender } from "./components/DailyFoodCalender/DailyFoodCalender";
import "./DailyFoodPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DailyFoodFeed } from "./components/DailyFoodFeed/DailyFoodFeed";

export const DailyFoodPage = () => {
  const setting = {
    dots: false,
    infinite: false,
    slidesToShow: 1.3,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
  };

  return (
    <>
      {/* <Header/> */}
      <main>
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
          <DailyFoodFeed />
          <DailyFoodFeed />
          <DailyFoodFeed />
          <DailyFoodFeed />
        </Slider>
      </main>
    </>
  );
};