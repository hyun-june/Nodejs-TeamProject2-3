import "./css/CommonInput.css";

export const CommonInput = ({
  className,
  title,
  children,
  register,
  ...props
}) => {
  return (
    <div className="common-form">
      <label className="common-form-title">{title}</label>
      <input
        {...props}
        {...(register && register(title))}
        className={`common-input ${className}`}
      />
      {children}
    </div>
  );
};
