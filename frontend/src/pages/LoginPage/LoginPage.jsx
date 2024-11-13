import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CommonForm from "../../components/shared/CommonForm";
import CommonButton from "../../components/shared/CommonButton";
import "./css/LoginPage.css";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const onLoginSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <div className="loginPage-Container">
      <div>L O G I N</div>
      <div className="login-section">
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <CommonForm title="Email" register={register} className="width-80" />
          <CommonForm
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

export default LoginPage;
