import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { CommonInput } from "../../components/shared/CommonInput/CommonInput";
import { CommonButton } from "../../components/shared/CommonButton/CommonButton";
import "./css/LoginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = async (formData) => {
    const { Email, Password } = formData;
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
    <main className="loginPage-Container">
      <h1>L O G I N</h1>
      <section>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <CommonInput title="Email" register={register} error={errors.Email} />
          <CommonInput
            title="Password"
            type="password"
            register={register}
            error={errors.Password}
          />
          <CommonButton type="submit" className="button-color_black">
            로그인
          </CommonButton>
        </form>

        <footer>
          <Link to="/sign-up">회원가입하기</Link>
        </footer>
      </section>
    </main>
  );
};
