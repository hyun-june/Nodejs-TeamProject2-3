import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { AuthInput } from "../../components/shared/AuthInput/AuthInput";
import { AuthButton } from "../../components/shared/AuthButton/AuthButton";
import "./css/LoginPage.css";
import { useLogin } from "../../core/hooks/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { mutate: login, isLoading, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleLoginSubmit = async (formData) => {

    login({ email: formData.Email, password: formData.Password });

    const { Email, Password } = formData;
    console.log(formData);
    try {
      const response = await api.post("/user/login", {
        email: Email,
        password: Password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        navigate("/");
      }
      throw new Error(response.data.error);
    } catch (error) {
      setError("Password", {
        type: "manual",
        message: error.error,
      });
    }
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
          <AuthButton type="submit" className="button-color_black">
            로그인
          </AuthButton>
        </form>

        <footer>
          <Link to="/sign-up">회원가입하기</Link>
        </footer>
      </section>
    </div>
  );
};
