import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { Header } from "../../components/shared/Header/Header";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FoodSearchResultDetail } from "./components/FoodSearchResultDetail";
import { useFoodSearch } from "../../core/query/food";
import "./FoodSearchPage.css";

export const FoodSearchPage = () => {
  const { search } = useLocation(); //쿼리 파라미터 가져오기
  const { mealtype } = useParams();
  const { bottomSheetProps, open } = useBottomSheet();
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 food 데이터를 로컬에서 관리

  const query = new URLSearchParams(search).get("q") || "";
  const date = new URLSearchParams(search).get("date");

  const {
    data: foods,
    isLoading,
    error,
  } = useFoodSearch(query, mealtype, date);

  console.log("Dddd", foods);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    open();
  };
  return (
    <>
      <header className="daily-food__search-header">
        <Header backTo={"/food"} className="daily-food__search-header">
          <SearchBar />
        </Header>
      </header>
      <main className="daily-food__search">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}
        {foods?.data && foods.data.length > 0 ? (
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
          <section className="DailyFood_Feed-content__no-search">
            <p> 검색 결과가 없습니다.</p>
          </section>
        )}

        <section>
          {selectedFood && (
            <BottomSheet {...bottomSheetProps} className="Food-bottomSheet">
              <FoodSearchResultDetail
                selectedFood={selectedFood}
                mealtype={mealtype}
                date={date}
              />
            </BottomSheet>
          )}
        </section>
      </main>
    </>
  );
};
