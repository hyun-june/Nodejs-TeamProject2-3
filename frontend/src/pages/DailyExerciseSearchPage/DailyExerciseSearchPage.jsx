import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { Header } from "../../components/shared/Header/Header";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { useFoodSearch } from "../../core/query/food";
import "../FoodSearchPage/FoodSearchPage.css";
import "./DailyExerciseSearchPage.css";
import { ExerciseSearchResult } from "./components/ExerciseSearchResult/ExerciseSearchResult";

export const DailyExerciseSearchPage = () => {
  const { search } = useLocation(); //쿼리 파라미터 가져오기
  const { bottomSheetProps, open } = useBottomSheet();
  const [selectedExercise, setSelectedExercise] = useState(null); // 선택된 운동

  const query = new URLSearchParams(search).get("q"); // q에 해당하는 검색어 값을 추출하는 코드
  const date = new URLSearchParams(search).get("date");

  const handleExerciseClick = () => {
    setSelectedExercise();
    open();
  };
  return (
    <>
      <header className="daily-food__search-header">
        <Header backTo={"/exercise"} className="daily-food__search-header">
          <SearchBar />
        </Header>
      </header>
      <main className="daily-food__search">
        <div
          className="DailyExercise__content-box"
          onClick={() => handleExerciseClick()}
        >
          <h1>기구운동</h1>
          <div className="DailyExercise__content-box__Num">
            <span id="daily-exercise-category">유산소</span>
            <span>-100kcal</span>
          </div>
        </div>
        {/* {foods?.data && foods.data.length > 0 ? (
          foods.data.map((food) => (
            <section
              className="DailyFood__Feed-content-box"
              key={food._id}
              onClick={() => handleFoodClick(food)}
            >
              <div className="DailyFood__Feed-content-box-inner">
                <h3>{food.name}</h3>
                <div className="DailyFood_Feed-content-box__explain">
                  <p>{`${food.defaultGram}g`}</p>
                  <p>{food.calorie} kcal</p>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p> 검색 결과가 없습니다. 직접 입력하기</p>
        )} */}

        <section>
          <BottomSheet {...bottomSheetProps} className="Food-bottomSheet">
            <ExerciseSearchResult />
          </BottomSheet>
        </section>
      </main>
    </>
  );
};
