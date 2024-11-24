import { useState } from "react";
import "./Cover.css";

export const Cover = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleCoverClick = () => {
    setIsExiting(true); // 종료 애니메이션 시작
    setTimeout(() => {
      onClose(); // 애니메이션 후 부모 컴포넌트에서 Cover 제거
    }, 500); // fade-out 애니메이션 시간과 일치
  };

  return (
    <div
      className={`cover-container ${isExiting ? "exit" : ""}`}
      onClick={handleCoverClick}
    >
      <img src="/HealthyLife.svg" alt="로고" />
      <p>당신의 일상에 건강을 더하다</p>
    </div>
  );
};
