import { SlCalender } from "react-icons/sl";
import { FaCaretDown } from "react-icons/fa";

export const DailyFoodCalender = () => {
  return (
    <>
      <div className="food-calender">
        <SlCalender className="food-calender__calender-icon" />
        <span>24년 11월 17일</span>
        <FaCaretDown className="food-calender__downBtn-icon" />
      </div>
    </>
  );
};
