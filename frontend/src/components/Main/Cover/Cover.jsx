import "./Cover.css";

export const Cover = ({ onClose }) => {
  return (
    <div className="cover-container" onClick={onClose}>
      <img src="/HealthyLife.svg" alt="로고" />
      <p>당신의 일상에 건강을 더하다</p>
    </div>
  );
};
