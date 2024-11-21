import Slider from "react-slick";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DailyFoodCalender } from "./components/DailyFoodCalender/DailyFoodCalender";
import "./DailyFoodPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DailyFoodFeed } from "./components/DailyFoodFeed/DailyFoodFeed";
import { Header } from "../../components/shared/Header/Header";
import { useFoodPage } from "../../core/hooks/useFood";

export const DailyFoodPage = () => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가
  const { data, isLoading, isError } = useFoodPage(selectedDate);
  const navigate = useNavigate(); // URL을 변경하기 위한 navigate 훅 사용

  // 총 칼로리 계산
  // const totalCalories = data
  //   ? Object.values(data)
  //       .flat()
  //       .reduce((sum, item) => sum + item.calories, 0)
  //   : 0;

  const onDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
    setSelectedDate(formattedDate); // 날짜를 형식에 맞게 업데이트
    navigate(`/food?date=${formattedDate}`); // URL을 쿼리 파라미터와 함께 업데이트
  };

  const setting = {
    dots: false,
    infinite: false,
    slidesToShow: 1.3,
    slidesToScroll: 0.75,
    arrows: false,
    swipe: true,
  };
  const mealTypes = ["아침", "점심", "저녁", "간식"];

  if (isLoading) return <div>Loading....</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;
  return (
    <>
      <header>
        <Header backTo={-1} title={"식단"} />
      </header>
      <main className="DailyFood">
        <DailyFoodCalender onDateChange={onDateChange} value={selectedDate} />

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
            <DailyFoodFeed
              key={mealType}
              mealType={mealType}
              // foods={data ? data[mealType] : []}  {/* data가 있을 때만 전달 */}
            />
          ))}
        </Slider>
      </main>
    </>
  );
};
