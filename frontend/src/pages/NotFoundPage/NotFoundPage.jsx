import { AuthButton } from "../../components/shared/AuthButton/AuthButton";
import { useNavigate } from "react-router-dom";
import "./css/NotFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="notFound-Container">
      <img src="/notfound.png" />
      <span>페이지를 찾을 수 없습니다..</span>
      <AuthButton onClick={handleGoHome} className="button-color_black">
        홈으로 가기
      </AuthButton>
    </div>
  );
};
