import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CommonInput } from "../../components/shared/CommonInput/CommonInput";
import { CommonButton } from "../../components/shared/CommonButton/CommonButton";
import "./css/LoginPage.css";

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const onLoginSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <div className="loginPage-Container">
      <div>L O G I N</div>
      <div className="login-section">
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <CommonInput title="Email" register={register} className="width-80" />
          <CommonInput
            title="Password"
            type="password"
            register={register}
            className="width-80"
          />
          <CommonButton type="submit" className="button-color_black">
            로그인
          </CommonButton>
        </form>
        <div className="page_Link">
          <Link to="/sign-up">회원가입하기</Link>
        </div>
      </div>
    </div>
  );
};
