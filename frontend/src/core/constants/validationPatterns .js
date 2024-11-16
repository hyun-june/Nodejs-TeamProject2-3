export const validationPatterns = {
  Email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "이메일 형식이 올바르지 않습니다.",
  },
  Password: {
    value: /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/, //하나의 알파벳과 하나의 숫자 + 8자 이상 20자 이내
    message: "비밀번호는 8~20자 이내로 입력하셔야합니다.",
  },
};
