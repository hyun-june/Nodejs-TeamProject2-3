import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import { SlCalender } from "react-icons/sl";
import { FaCaretDown } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import "react-calendar/dist/Calendar.css"; // Calendar 스타일을 위해 추가

export const WaterCalender = ({ onDateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState("");

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDateChange = (newDate) => {
    if (newDate instanceof Date && !isNaN(newDate)) {
      setDate(newDate); // 날짜 변경
      setIsModalOpen(false);
    } else {
      console.error("유효하지 않은 날짜가 선택되었습니다:", newDate);
    }
  };

  useEffect(() => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      setToday(formattedDate); // today 값이 빈 값으로 설정되지 않도록
      console.log("오늘날짜", formattedDate);
    } else {
      console.log("유효하지 않은 날짜:", date);
    }
  }, [date]); // date 상태가 변경될 때마다 today 업데이트

  useEffect(() => {
    if (date instanceof Date && !isNaN(date)) {
      onDateChange(date);
    }
  }, [date]);
  useEffect(() => {
    console.log("today updated:", today);
  }, [today]);
  return (
    <>
      <div className="water-calender">
        <SlCalender className="water-calender__calender-icon" />
        <span>{today}</span> {/* 최신 today 출력 */}
        <FaCaretDown
          className="water-calender__downBtn-icon"
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
