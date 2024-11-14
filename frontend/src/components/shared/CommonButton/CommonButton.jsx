import "./css/CommonButton.css";

export const CommonButton = ({ type, onClick, children, className }) => {
  return (
    <div style={{ width: "80%" }}>
      <button
        type={type}
        onClick={onClick}
        className={`common-button ${className}`}
      >
        {children}
      </button>
    </div>
  );
};
