import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { CommonInput } from "../../components/shared/CommonInput/CommonInput";
import { CommonButton } from "../../components/shared/CommonButton/CommonButton";
import "./css/SignUpPage.css";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleSingUpSubmit = async (formData) => {
    const { Password, ConfirmPassword, Email, Name } = formData;
    try {
      if (Password !== ConfirmPassword) {
        setError("ConfirmPassword", {
          type: "manual",
          message: "패스워드가 일치하지 않습니다. 다시 입력해주세요.",
        });
        return;
      }
      const response = await api.post("/user", {
        password: Password,
        email: Email,
        name: Name,
      });
      if (response.status == 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      return error.error;
    }
  };

  return (
    <main className="signUpPage-Container">
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit(handleSingUpSubmit)}>
        <CommonInput
          title="Name"
          type="text"
          register={register}
          error={errors.Name}
        />
        <CommonInput
          title="Email"
          type="text"
          register={register}
          error={errors.Email}
        />
        <CommonInput
          title="Password"
          type="password"
          register={register}
          error={errors.Password}
        />
        <CommonInput
          title="ConfirmPassword"
          type="password"
          register={register}
          error={errors.ConfirmPassword}
        />

        <CommonButton type="submit" className="button-color_black">
          회원가입
        </CommonButton>
      </form>
      <footer>
        <Link to="/login">로그인 하기</Link>
      </footer>
    </main>
  );
};
