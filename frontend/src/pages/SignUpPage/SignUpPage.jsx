import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CommonForm from "../../components/shared/CommonForm";
import CommonButton from "../../components/shared/CommonButton";
import "./css/SignUpPage.css";

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();

  const onSingUpSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <div className="signUpPage-Container">
      <div>S I G N U P</div>
      <form onSubmit={handleSubmit(onSingUpSubmit)}>
        <CommonForm
          title="Email"
          type="text"
          register={register}
          className="width-80"
        />
        <CommonForm
          title="Password"
          type="password"
          register={register}
          className="width-80"
        />
        <CommonForm
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

export default SignUpPage;
