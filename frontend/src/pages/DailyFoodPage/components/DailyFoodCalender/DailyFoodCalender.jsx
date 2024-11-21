import { useState } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import { SlCalender } from "react-icons/sl";
import { FaCaretDown } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import "react-calendar/dist/Calendar.css"; // Calendar 스타일을 위해 추가

export const DailyFoodCalender = ({ onDateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const today = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="food-calender">
        <SlCalender className="food-calender__calender-icon" />
        <span>{today}</span>
        <FaCaretDown
          className="food-calender__downBtn-icon"
          onClick={handleToggleModal}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        ariaHideApp={false}
        className="modal-content"
      >
        <div className="modal-content">
          <button onClick={handleToggleModal}>
            <IoMdCloseCircle />
          </button>
          <Calendar onChange={handleDateChange} value={date} />
        </div>
      </Modal>
    </>
  );
};
