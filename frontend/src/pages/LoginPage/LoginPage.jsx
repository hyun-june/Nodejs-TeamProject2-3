import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthInput } from "../../components/shared/AuthInput/AuthInput";
import { useLogin } from "../../core/query/auth";
import "./css/LoginPage.css";
import { PendingButton } from "../../components/shared/PendingButton/PendingButton";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutate: login, isPending, isError, error } = useLogin();

  const handleLoginSubmit = (formData) => {
    login({ email: formData.Email, password: formData.Password });
  };

  return (
    <div className="loginPage-Container">
      <h1>L O G I N</h1>
      <section>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <AuthInput
            id="login-email"
            title="Email"
            register={register}
            error={errors.Email}
          />
          <AuthInput
            id="login-password"
            title="Password"
            type="password"
            register={register}
            error={errors.Password}
          />
          <PendingButton isPending={isPending} round="sm">
            로그인
          </PendingButton>
        </form>

        <footer>
          <Link to="/sign-up">회원가입하기</Link>
        </footer>
      </section>
    </div>
  );
};
