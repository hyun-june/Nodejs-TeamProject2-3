import "./AuthButton.css";

export const AuthButton = ({ type, onClick, children, className }) => {
  return (
    <div className="auth-button_Area">
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    </div>
  );
};
