import { Link } from "react-router-dom";
import { Header } from "../../components/shared/Header/Header";
import { Button } from "../../components/shared/Button/Button";
import { IoIosArrowForward } from "react-icons/io";
import { dateParser } from "../../core/utils/fn/dateParser";
import { useGetDailyWeight } from "../../core/query/dailyWeight";
import { useFoodPage } from "../../core/query/food";
import { useGetWaterAmount } from "../../core/query/water";
import { useGetDailyExercise } from "../../core/query/exercise";
import { PendingContainer } from "../../components/shared/PendingContainer/PendingContainer";
import "./MainPage.css";

export const MainPage = () => {
  const now = new Date();
  const parseDate = dateParser(now);
  const { data: dailyWeightData, isPending: isPending1 } = useGetDailyWeight({
    date: parseDate,
  });
  const { data: dailyFoodData, isPending: isPending2 } = useFoodPage(parseDate);
  const { data: dailywaterData, isPending: isPending3 } =
    useGetWaterAmount(parseDate);
  const { data: dailyExerciseData, isPending: isPending4 } =
    useGetDailyExercise({ data: parseDate });

  const weight = dailyWeightData?.data?.weight && dailyWeightData?.data?.weight;
  const waterAmount = dailywaterData
    ? (dailywaterData.data.amount / 2000) * 100
    : 0;
  const totalFoodCalorie = dailyFoodData
    ? Object.values(dailyFoodData?.data).reduce(
        (acc, crr) =>
          acc +
          crr.reduce(
            (acc, { quantity, calories }) => quantity * calories + acc,
            0
          ),
        0
      )
    : 0;
  const totalExerciseCalorie =
    dailyExerciseData &&
    weight &&
    Math.floor(
      dailyExerciseData?.dailyExercise.reduce(
        (acc, { durationOrDistance, mets }) =>
          weight * (durationOrDistance / 60) * mets + acc,
        0
      )
    );

  if (isPending1 || isPending2 || isPending3 || isPending4)
    return <PendingContainer />;

  return (
    <div className="main-page">
      <Header title="헬띠 라이프">
        <div></div>
      </Header>
      <main>
        <section>
          <h3 className="small-title">일일 활동</h3>
          <div
            className="circle-progress-bar"
            style={{
              background: `conic-gradient( #90ADFF ${Math.floor(
                (totalFoodCalorie / 2500) * 100
              )}%, transparent 0%)`,
            }}
          >
            <Link to="/water" className="water-progress-bar">
              <div
                className="water-progress-value"
                style={{ height: `${waterAmount}%` }}
              />
              <div className="water-progress-bar-text">
                <h6>WATER</h6>
                <h1>{waterAmount}%</h1>
              </div>
            </Link>
          </div>
        </section>
        <section>
          {totalFoodCalorie ? (
            <div className="straght-progress sky-thema">
              <div className="straght-progress-head">
                <h4>식단</h4>
                <div className="progress-number">
                  <span>{totalFoodCalorie} </span>
                  <span>/ 2500KCAL</span>
                </div>
              </div>
              <div className="straght-progress-bar">
                <div
                  style={{
                    width: `${Math.floor((totalFoodCalorie / 2500) * 100)}%`,
                  }}
                />
              </div>
              <Link to="/food" className="straght-progress-bottom">
                <div className="center">식단페이지</div>
                <IoIosArrowForward />
              </Link>
            </div>
          ) : (
            <Link to="/food">
              <div className="straght-progress-bar-empty sky-thema mb-10">
                <h3>오늘 먹은 식단 입력하러가기!</h3>
                <IoIosArrowForward />
              </div>
            </Link>
          )}
          {totalExerciseCalorie ? (
            <div className="straght-progress semired-thema">
              <div className="straght-progress-head">
                <h4>운동</h4>
                <div className="progress-number">
                  <span>{totalExerciseCalorie} </span>
                  <span>/ 2500KCAL</span>
                </div>
              </div>
              <div className="straght-progress-bar">
                <div
                  style={{
                    width: `${Math.floor(
                      (totalExerciseCalorie / 2500) * 100
                    )}%`,
                  }}
                />
              </div>
              <Link to="/exercise" className="straght-progress-bottom">
                <div className="center">운동페이지</div>
                <IoIosArrowForward />
              </Link>
            </div>
          ) : (
            <Link to="/exercise">
              <div className="straght-progress-bar-empty semired-thema">
                <h3>오늘 한 운동 입력하러가기!</h3>
                <IoIosArrowForward />
              </div>
            </Link>
          )}
        </section>
        <section className="weight-section">
          <h3 className="small-title">몸무게</h3>
          {weight ? (
            <span className="weight">{`${weight}kg`}</span>
          ) : (
            <span>오늘의 정보가 없습니다</span>
          )}
          <div className="weight-decription">
            {/* <span>저번달보다 </span>
              <span>3.5kg</span>
              <span>만큼 줄었어요</span> */}
          </div>
          <Link to="/weight">
            <Button thema="" round="sm">
              몸무게 기록하기
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
};
