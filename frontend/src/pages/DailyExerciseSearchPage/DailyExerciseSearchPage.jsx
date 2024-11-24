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
import { useGetSearchedExercise } from "../../core/query/exercise";

export const DailyExerciseSearchPage = () => {
  const { search } = useLocation(); //쿼리 파라미터 가져오기
  const { bottomSheetProps, open } = useBottomSheet();
  const [selectedExercise, setSelectedExercise] = useState(null); // 선택된 운동

  const query = new URLSearchParams(search).get("q"); // q에 해당하는 검색어 값을 추출하는 코드
  const date = new URLSearchParams(search).get("date");
  const { data, isPending, error } = useGetSearchedExercise(query, date);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
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
        {isPending ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>운동 데이터를 불러오는 중 에러가 발생했습니다.</p>
        ) : data?.data?.length > 0 ? (
          data.data.map((exercise) => (
            <div
              className="DailyExercise__content-box"
              key={exercise._id}
              onClick={() => handleExerciseClick(exercise)}
            >
              <h1>{exercise.name}</h1>
              <div className="DailyExercise__content-box__Num">
                <span id="daily-exercise-category">{exercise.category}</span>
                {/* <span></span> */}
              </div>
            </div>
          ))
        ) : (
          <section className="DailyFood_Feed-content__no-search">
            <p>검색 결과가 없습니다.</p>
          </section>
        )}
        <section>
          <BottomSheet {...bottomSheetProps} className="Food-bottomSheet">
            <ExerciseSearchResult
              selectedExercise={selectedExercise}
              date={date}
            />
          </BottomSheet>
        </section>
      </main>
    </>
  );
};
