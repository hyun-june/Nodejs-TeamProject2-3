import { validationPatterns } from "./../../../core/constants/validationPatterns ";
import "./AuthInput.css";

export const AuthInput = ({
  id = "",
  className,
  title,
  register,
  error,
  ...props
}) => {
  return (
    <div className="auth-form">
      <label htmlFor={id}>{title}</label>
      <input
        id={id}
        {...(register &&
          register(title, {
            required: `필수 입력 항목입니다.`,
            pattern: validationPatterns[title],
          }))}
        className={className}
        {...props}
      />
      {error?.message && <span>{error.message}</span>}
    </div>
  );
};
