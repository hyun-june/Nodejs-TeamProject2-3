import { useState } from "react";
import {
  useDeleteDailyExercise,
  useUpdateDailyExercise,
} from "../../../core/query/exercise";

export const DailyExerciseSelectedPage = ({ selectedExercise, close }) => {
  const [quantity, setQuantity] = useState("");
  const { mutate: updateExercise, isPending, error } = useUpdateDailyExercise();
  const { mutate: deleteFood } = useDeleteDailyExercise();
  const { _id } = selectedExercise;

  const handleUpdateExercise = () => {
    updateExercise({
      quantity,
      exerciseId: _id,
    });
    close();
  };

  const handleDeleteExercise = () => {
    deleteFood({
      exerciseId: _id,
    });
    close();
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
          <div className="FoodDetail-addButton ">
            <button onClick={handleUpdateExercise}>수정</button>
          </div>
          <div className="FoodDetail-addButton ExerciseDetail-deleteButton">
            <button onClick={handleDeleteExercise}>삭제</button>
          </div>
        </section>
      </footer>
    </>
  );
};
