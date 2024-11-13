import React from "react";
import { useForm } from "react-hook-form";
import CommonForm from "../../components/shared/CommonForm";
import CommonButton from "../../components/shared/CommonButton";
import "./css/UserDetailPage.css";

const UserDetailPage = () => {
  const { register, handleSubmit } = useForm();

  const onUserSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <div className="userDetailPage-Container">
      <form onSubmit={handleSubmit(onUserSubmit)}>
        <div className="detail-first-section">
          <CommonForm title="나이" type="number" register={register} />
          <CommonForm title="키" type="number" register={register} />
        </div>
        <div className="detail-second-section">
          <CommonForm title="체중" type="number" register={register} />
          <CommonForm title="목표 체중" type="number" register={register} />
          <CommonButton type="submit" className="button-color_blue">
            저장
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default UserDetailPage;
