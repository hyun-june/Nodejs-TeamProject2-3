import Slider from "react-slick";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DailyFoodCalender } from "./components/DailyFoodCalender/DailyFoodCalender";
import { DailyFoodFeed } from "./components/DailyFoodFeed/DailyFoodFeed";
import { Header } from "../../components/shared/Header/Header";
import { useFoodPage } from "../../core/hooks/useFood";
import { DailyFoodChart } from "./components/DailyFoodChart/DailyFoodChart";
import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";

import "./DailyFoodPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DailyFoodPage = () => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가
  const [selectedFood, setSelectedFood] = useState(null);
  const { data, isLoading, isError } = useFoodPage(selectedDate);
  const { bottomSheetProps, open } = useBottomSheet();
  const navigate = useNavigate(); // URL을 변경하기 위한 navigate 훅 사용

  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 형식
    setSelectedDate(formattedDate); // 날짜를 형식에 맞게 업데이트    setSelectedDate(formattedDate); // 날짜를 형식에 맞게 업데이트
    navigate(`/food?date=${formattedDate}`); // URL을 쿼리 파라미터와 함께 업데이트
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    open();
  };

  // **총 칼로리 계산 함수**
  const calculateCaloriesByMeal = (data) => {
    if (!data || typeof data !== "object") return {};

    const result = {};
    for (const [mealType, foods] of Object.entries(data)) {
      result[mealType] = foods.reduce(
        (sum, food) => sum + (food.calories || 0),
        0
      );
    }
    return result;
  };

  const mealCalories = data?.data ? calculateCaloriesByMeal(data.data) : {};
  const totalCalories = Object.values(mealCalories).reduce(
    (sum, cals) => sum + cals,
    0
  );

  // **영양소 계산 함수**
  const calculateNutrientsByMeal = (data) => {
    if (!data || typeof data !== "object")
      return { carbohydrate: 0, protein: 0, fat: 0 };

    const result = {
      carbohydrate: 0,
      protein: 0,
      fat: 0,
    };

    for (const [mealType, foods] of Object.entries(data)) {
      foods.forEach((food) => {
        // 각 음식의 영양소 합산
        result.carbohydrate += food.nutrition?.carbs || 0;
        result.protein += food.nutrition?.protein || 0;
        result.fat += food.nutrition?.fat || 0;
      });
    }

    return result;
  };

  // 영양소 계산
  const totalNutrients = data?.data ? calculateNutrientsByMeal(data.data) : {};
  console.log("영양소", totalNutrients);

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
            <span>{totalCalories}</span>
            <span>kcal</span>
          </div>
        </div>
        <Slider {...setting}>
          {mealTypes.map((mealType) => (
            <DailyFoodFeed
              key={mealType}
              mealType={mealType}
              foods={data ? data.data[mealType] : []} // 실제 음식 데이터를 전달
              mealCalories={mealCalories[mealType] || 0} // 각 식사별 칼로리 전달
              onFoodClick={handleFoodClick}
            />
          ))}
        </Slider>

        <footer className="DailyFoodPage__footer">
          <div className="DailyFoodPage__footer-title">
            <span>총 영양소</span>
          </div>

          <section className="DailyFoodPage__footer-main">
            <section className="DailyFoodPage__footer-main__text-part">
              <div>
                <p>{totalNutrients.carbohydrate}g</p>
                <p>탄수화물</p>
              </div>
              <div>
                <p> {totalNutrients.protein}g</p>
                <p>단백질</p>
              </div>
              <div>
                <p>{totalNutrients.fat}g</p>
                <p>지방</p>
              </div>
            </section>
            <article className="DailyFoodPage__footer-main__chart-part">
              <DailyFoodChart
                nutrients={{
                  carbohydrate: totalNutrients.carbohydrate,
                  protein: totalNutrients.protein,
                  fat: totalNutrients.fat,
                }}
              />
            </article>
          </section>
        </footer>
      </main>
      {selectedFood && (
        <BottomSheet {...bottomSheetProps} className="Food-bottomSheet">
          <div>
            <h3>{selectedFood.food}</h3>
            <p>{selectedFood.calories} kcal</p>
            <p>{selectedFood.defaultGram} g</p>
          </div>
        </BottomSheet>
      )}
    </>
  );
};
