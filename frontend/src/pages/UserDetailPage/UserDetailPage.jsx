import React from "react";
import { useForm } from "react-hook-form";
import { CommonInput } from "../../components/shared/CommonInput/CommonInput";
import { CommonButton } from "../../components/shared/CommonButton/CommonButton";
import "./css/UserDetailPage.css";

export const UserDetailPage = () => {
  const { register, handleSubmit } = useForm();

  const onUserSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <main className="userDetailPage-Container">
      <form onSubmit={handleSubmit(onUserSubmit)}>
        <CommonInput title="닉네임" register={register} />
        <section className="detail-first-section">
          <CommonInput title="나이" type="number" register={register} />
          <CommonInput title="키" type="number" register={register} />
        </section>
        <section className="detail-second-section">
          <CommonInput title="체중" type="number" register={register} />
          <CommonInput title="목표 체중" type="number" register={register} />
          <CommonButton type="submit" className="button-color_blue">
            저장
          </CommonButton>
        </section>
      </form>
    </main>
  );
};
