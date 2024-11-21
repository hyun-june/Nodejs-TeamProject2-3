import { useLocation } from "react-router-dom";
import { useState } from "react";

import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { Header } from "../../components/shared/Header/Header";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FoodSearchResultDetail } from "./components/FoodSearchResultDetail";
import { useFoodSearch } from "../../core/query/food";
import "./FoodSearchPage.css";

export const FoodSearchPage = () => {
  const { search } = useLocation();
  const { bottomSheetProps, open } = useBottomSheet();
  const [selectedFood, setSelectedFood] = useState(null); // 선택된 food 데이터를 로컬에서 관리

  const query = new URLSearchParams(search).get("q"); // q에 해당하는 검색어 값을 추출하는 코드
  const { data: foods, isLoading, error } = useFoodSearch(query);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    open();
  };
  return (
    <>
      <header>
        <Header>
          <SearchBar />
        </Header>
      </header>
      <main>
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
          <p> 검색 결과가 없습니다. 직접 입력하기</p>
        )}

        <section>
          {selectedFood && (
            <BottomSheet {...bottomSheetProps} className="Food-bottomSheet">
              <FoodSearchResultDetail selectedFood={selectedFood} />
            </BottomSheet>
          )}
        </section>
      </main>
    </>
  );
};
