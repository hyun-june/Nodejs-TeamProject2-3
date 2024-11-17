import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const DailyFoodFeed = () => {
  return (
    <>
      <div className="DailyFood__Feed">
        <div className="DailyFood__Feed-title">아침</div>
        <div className="DailyFood__Feed-content-box">
          <div className="DailyFood__Feed-content-box-inner">
            <div>사과</div>
            <div className="DailyFood_Feed-content-box__explain">
              <div>1개 평균 크기 100g</div>
              <div>57Kcal</div>
            </div>
          </div>
        </div>
        <div>
          <div>57</div>
        </div>
      </div>
    </>
  );
};
