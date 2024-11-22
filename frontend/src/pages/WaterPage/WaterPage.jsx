import { useState } from "react";
import { Header } from "../../components/shared/Header/Header";
import { WaterCalender } from "./WaterCalender/WaterCalender";
import "./WaterPage.css";

export const WaterPage = () => {
  const [selectedData, setSelectedDate] = useState(null);
  const [waterHeight, setWaterHeight] = useState(0);

  const MAX_HEIGHT = 300; // 병의 총 높이
  const MAX_WATER = 2000;
  const STEP_WATER = 250;

  const onDateChange = (newDate) => {
    const formattedDate = newDate.toLocaleDateString("en-CA");
    setSelectedDate(formattedDate);
  };

  const addWater = () => {
    if (waterHeight < MAX_WATER) {
      setWaterHeight(waterHeight + STEP_WATER);
    }
  };

  const removeWater = () => {
    if (waterHeight > 0) {
      setWaterHeight(waterHeight - STEP_WATER);
    }
  };

  const calculateWaterHeight = () => {
    return (waterHeight / MAX_WATER) * MAX_HEIGHT; // 비율에 따라 높이 계산
  };

  return (
    <>
      <Header backTo={-1} title="물 마시기" />
      <div className="water-container">
        <WaterCalender onDateChange={onDateChange} value={selectedData} />
        <div className="container">
          <div className="bottle-neck"></div>
          <div className="bottle">
            <div
              className="water"
              style={{ height: `${calculateWaterHeight()}px` }}
            ></div>
          </div>
          <p className="waterHeight">{waterHeight}</p>
          <p>/2000mL</p>
          <div className="buttonContainer">
            <button
              className={`controlButton ${
                waterHeight === MAX_WATER ? "disabledButton" : ""
              }`}
              onClick={addWater}
              disabled={waterHeight === MAX_WATER}
            >
              + 250mL
            </button>
            <button
              className={`controlButton ${
                waterHeight === 0 ? "disabledButton" : ""
              }`}
              onClick={removeWater}
              disabled={waterHeight === 0}
            >
              - 250mL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
