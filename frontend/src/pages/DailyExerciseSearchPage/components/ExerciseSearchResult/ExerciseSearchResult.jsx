import { useState, useRef, useEffect } from "react";

export const ExerciseSearchResult = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <header className="FoodDetail-title">
        <h1>달리기</h1>
      </header>
      <main className="ExerciseDetail-main">
        <section className="ExerciseDetail-main__category">
          <p>유산소</p>
          <p>무산소</p>
        </section>
        <section className="ExerciseDetail-main__description">
          <div>일반적인 달리기입니다!</div>
        </section>
      </main>

      <footer>
        <section className="ExerciseDetail-footer__title">
          <h3>운동 시간</h3>
        </section>
        <section className="ExerciseDetail-footer__btnAndInput">
          <input></input>
          <div className="FoodDetail-addButton">
            <button>추가</button>
          </div>
        </section>
      </footer>
    </>
  );
};
