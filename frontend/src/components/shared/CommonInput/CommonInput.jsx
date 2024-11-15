import "./CommonInput.css";

export const CommonInput = ({
  className,
  title,
  children,
  register,
  error,
  ...props
}) => {
  const pattern = {
    Email: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "이메일 형식이 올바르지 않습니다",
    },
    Password: {
      value: /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/, //하나의 알파벳과 하나의 숫자 + 8자 이상 20자 이내
      message: "비밀번호는 8~20자 이내로 입력하셔야합니다.",
    },
  };
  return (
    <main className="common-form">
      <label className="common-form-title">{title}</label>
      <input
        {...props}
        {...(register &&
          register(title, {
            required: `필수 입력 항목입니다.`,
            pattern: pattern[title],
          }))}
        className={`common-input ${className}`}
      />
      {error?.message && <span className="error-message">{error.message}</span>}
      {children}
    </main>
  );
};
