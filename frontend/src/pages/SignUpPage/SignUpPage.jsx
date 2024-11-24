import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthInput } from "../../components/shared/AuthInput/AuthInput";
import { useSignUp } from "../../core/query/auth";
import "./css/SignUpPage.css";
import { PendingButton } from "../../components/shared/PendingButton/PendingButton";

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutate: signUp, isPending, isError, error } = useSignUp();

  const handleSingUpSubmit = async (formData) => {
    const { Password, ConfirmPassword, Email, Name } = formData;

    if (Password !== ConfirmPassword) {
      setError("ConfirmPassword", {
        type: "manual",
        message: "패스워드가 일치하지 않습니다. 다시 입력해주세요.",
      });
      return;
    }
    signUp({
      name: formData.Name,
      email: formData.Email,
      password: formData.Password,
    });
  };

  return (
    <div className="signUpPage-Container">
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit(handleSingUpSubmit)}>
        <AuthInput
          id="signup-name"
          title="Name"
          type="text"
          register={register}
          error={errors.Name}
        />
        <AuthInput
          id="signup-email"
          title="Email"
          type="text"
          register={register}
          error={errors.Email}
        />
        <AuthInput
          id="signup-password"
          title="Password"
          type="password"
          register={register}
          error={errors.Password}
        />
        <AuthInput
          id="signup-confirmpassword"
          title="ConfirmPassword"
          type="password"
          register={register}
          error={errors.ConfirmPassword}
        />

        <PendingButton round="sm" isPending={isPending}>
          회원가입
        </PendingButton>
      </form>
      <footer>
        <Link to="/login">로그인 하기</Link>
      </footer>
    </div>
  );
};
