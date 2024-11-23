import { useState, useRef, useEffect } from "react";

import { useAddDailyExercise } from "../../../../core/query/exercise";

export const ExerciseSearchResult = ({ selectedExercise, date }) => {
  const [quantity, setQuantity] = useState("");
  const { mutate: addExercise, isPending, error } = useAddDailyExercise();

  const handleAddExercise = () => {
    if (isPending) return;

    // 양수 값만 허용
    if (!quantity || Number(quantity) <= 0) {
      alert("운동 시간을 올바르게 입력해주세요.");
      return;
    }

    addExercise({
      exercise: selectedExercise,
      quantity: Number(quantity),
      date,
    });
  };

  return (
    <>
      <header className="FoodDetail-title">
        <h1>{selectedExercise.name}</h1>
      </header>
      <main className="ExerciseDetail-main">
        <section className="ExerciseDetail-main__category">
          {selectedExercise.category?.map((cat, index) => (
            <p key={index}>{cat}</p>
          ))}
        </section>
        <section className="ExerciseDetail-main__description">
          <div>{selectedExercise.description}</div>
        </section>
      </main>

      <footer>
        <section className="ExerciseDetail-footer__title">
          <h3>운동 시간</h3>
        </section>
        <section className="ExerciseDetail-footer__btnAndInput">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="운동 시간 입력 (분)"
          ></input>
          <div className="FoodDetail-addButton">
            <button onClick={handleAddExercise}>추가</button>
          </div>
        </section>
      </footer>
    </>
  );
};
