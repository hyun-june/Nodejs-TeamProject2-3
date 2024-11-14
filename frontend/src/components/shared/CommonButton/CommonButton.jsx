import "./css/CommonButton.css";

export const CommonButton = ({ type, onClick, children, className }) => {
  return (
    <div className="common-button_Area">
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
