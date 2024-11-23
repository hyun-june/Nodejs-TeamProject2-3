import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { GoPlus } from "react-icons/go";

import { Header } from "../../components/shared/Header/Header";
import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { DailyFoodCalender } from "../DailyFoodPage/components/DailyFoodCalender/DailyFoodCalender";

import "../DailyFoodPage/DailyFoodPage.css";
import "./DailyExercisePage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllExerciseApi } from "../../core/api/exercise";

export const DailyExercisePage = () => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const query = { data: selectedDate };
  //   const { data, isPending, error } = getAllExerciseApi(query);
  const { bottomSheetProps, open } = useBottomSheet();
  const navigate = useNavigate();

  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-CA"); // "YYYY-MM-DD" 형식
    setSelectedDate(formattedDate); // 날짜를 형식에 맞게 업데이트
    navigate(`/exercise?date=${formattedDate}`); // URL을 쿼리 파라미터와 함께 업데이트
  };

  return (
    <>
      <header>
        <Header backTo={-1} title={"운동"} />
      </header>
      <main className="DailyExercise">
        <DailyFoodCalender onDateChange={onDateChange} value={selectedDate} />
        <div className="DailyExercise__total-calorie">
          <div>
            <span>총 소모 칼로리</span>
          </div>
          <div className="DailyExercise__total-calorie__Num">
            <span>아르빠노</span>
            <span>kcal</span>
          </div>
        </div>
        <section className="DailyExercise__content">
          <div className="DailyExercise__content-box">
            <h1>기구운동</h1>
            <div className="DailyExercise__content-box__Num">
              <span>05:30</span>
              <span>-100kcal</span>
            </div>
          </div>
          <Link to={`/exercise/search?date=${selectedDate}`}>
            <div className="DailyExercise__content-box">
              <button>
                <GoPlus />
              </button>
            </div>
          </Link>
        </section>
      </main>
      <BottomSheet {...bottomSheetProps}></BottomSheet>
    </>
  );
};
