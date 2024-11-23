import { Link } from "react-router-dom";
import { Header } from "../../components/shared/Header/Header";
import { Button } from "../../components/shared/Button/Button";
import { IoIosArrowForward } from "react-icons/io";
import { dateParser } from "../../core/utils/fn/dateParser";
import { useGetDailyWeight } from "../../core/query/dailyWeight";
import { useFoodPage } from "../../core/query/food";
import "./MainPage.css";

export const MainPage = () => {
    const now = new Date
    const parseDate = dateParser(now)
    const { data : dailyWeightData } = useGetDailyWeight({ date : parseDate})
    const { data : dailyFoodData } = useFoodPage(parseDate);

    const totalCalorie = dailyFoodData ? Object.values(dailyFoodData?.data).reduce((acc, crr)=> 
      acc + crr.reduce((acc,{ quantity, calories }) => quantity * calories + acc ,0), 0) : 0

  return (
    <div className="main-page">
      <Header title="헬띠 라이프">
        <div>설정</div>
      </Header>
      <main>
        <section>
          <h3 className="small-title">일일 활동</h3>
          <div className="circle-progress-bar" style={{ 
            background : `conic-gradient( #90ADFF ${Math.floor((totalCalorie / 1500) * 100)}%, transparent 0%)`
          }}>

            <Link to="/water" className="water-progress-bar">
              <div className="water-progress-value" />
              <div className="water-progress-bar-text">
                <h6>WATER</h6>
                <h1>30%</h1>
              </div>
            </Link>
          </div>
        </section>
        <section>
          {
            dailyFoodData && <div className="straght-progress sky-thema">
              <div className="straght-progress-head">
                <h4>식단</h4>
                <div className="progress-number">
                  <span>{totalCalorie} </span>
                  <span>/ 1500KCAL</span>
                </div>
              </div>
              <div className="straght-progress-bar">
                <div style={{width : `${Math.floor((totalCalorie / 1500) * 100)}%`}}/>
              </div>
              <Link to="/food" className="straght-progress-bottom">
                <div className="center">식단페이지</div>
                <IoIosArrowForward />
              </Link>
            </div>
          }
          
          <div className="straght-progress semired-thema">
            <div className="straght-progress-head">
              <h4>운동</h4>
              <div className="progress-number">
                <span>488 </span>
                <span>/ 1500KCAL</span>
              </div>
            </div>
            <div className="straght-progress-bar">
              <div />
            </div>
            <Link to="/exercise" className="straght-progress-bottom">
              <div className="center">운동페이지</div>
              <IoIosArrowForward />
            </Link>
          </div>
        </section>
        <section className="weight-section">
          <h3 className="small-title">몸무게</h3>

          { dailyWeightData?.data?.weight ?  
            <span className="weight">{ `${dailyWeightData.data.weight}kg` }</span>  : 
            <span >오늘의 정보가 없습니다</span>
          }
          <div className="weight-decription">
            {/* <span>저번달보다 </span>
            <span>3.5kg</span>
            <span>만큼 줄었어요</span> */}
          </div>
          <Link to="/weight">
            <Button thema="point" round="sm">
              몸무게 기록하기
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
};
