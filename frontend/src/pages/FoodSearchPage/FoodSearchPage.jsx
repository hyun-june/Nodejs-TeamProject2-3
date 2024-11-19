import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { Header } from "../../components/shared/Header/Header";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FoodSearchResultDetail } from "./components/FoodSearchResultDetail";
import "./FoodSearchPage.css";

export const FoodSearchPage = () => {
  const { bottomSheetProps, open } = useBottomSheet();
  return (
    <>
      <header>
        <Header>
          <SearchBar />
        </Header>
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
          <BottomSheet {...bottomSheetProps} className="Food-bottomSheet">
            <FoodSearchResultDetail />
          </BottomSheet>
        </section>
      </main>
    </>
  );
};
