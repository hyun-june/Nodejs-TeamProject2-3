import React from "react";
import "./css/NotFoundPage.css";
import { CommonButton } from "../../components/shared/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="notFound-Container">
      <img src="/notfound.png" />
      <span>페이지를 찾을 수 없습니다..</span>
      <CommonButton onClick={handleGoHome} className="button-color_black">
        홈으로 가기
      </CommonButton>
    </div>
  );
};
