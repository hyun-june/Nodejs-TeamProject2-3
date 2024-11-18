import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FoodSearchResultDetail } from "./components/FoodSearchResultDetail";
import "./FoodSearchPage.css";

export const FoodSearchPage = () => {
  const { bottomSheetProps, open, close } = useBottomSheet();
  return (
    <>
      <header>
        <SearchBar />
      </header>
      <main>
        <section className="DailyFood__Feed-content-box" onClick={open}>
          <div className="DailyFood__Feed-content-box-inner">
            <h3>사과</h3>
            <div className="DailyFood_Feed-content-box__explain">
              <p>1개 평균 크기 100g</p>
              <p>57Kcal</p>
            </div>
          </div>
        </section>
        <section>
          <BottomSheet {...bottomSheetProps}>
            <button onClick={close}>닫기</button>
          </BottomSheet>
        </section>
        <section>
          <FoodSearchResultDetail />
        </section>
      </main>
    </>
  );
};
