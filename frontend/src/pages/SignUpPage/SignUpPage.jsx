import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CommonInput } from "../../components/shared/CommonInput/CommonInput";
import { CommonButton } from "../../components/shared/CommonButton/CommonButton";
import "./css/SignUpPage.css";

export const SignUpPage = () => {
  const { register, handleSubmit } = useForm();

  const onSingUpSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <div className="signUpPage-Container">
      <div>S I G N U P</div>
      <form onSubmit={handleSubmit(onSingUpSubmit)}>
        <CommonInput
          title="Email"
          type="text"
          register={register}
          className="width-80"
        />
        <CommonInput
          title="Password"
          type="password"
          register={register}
          className="width-80"
        />
        <CommonInput
          title="Confirm Password"
          type="password"
          register={register}
          className="width-80"
        />
        <CommonButton type="submit" className="button-color_black">
          회원가입
        </CommonButton>
      </form>
      <div className="page_Link">
        <Link to="/login">로그인 하기</Link>
      </div>
    </div>
  );
};
