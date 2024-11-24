import { useNavigate } from "react-router-dom";
import { PendingButton } from "../../components/shared/PendingButton/PendingButton";
import "./css/NotFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="notFound-layout">
      <div className="notFound-Container">
        <img src="/notfound.png" />
        <span>페이지를 찾을 수 없습니다..</span>

        <PendingButton onClick={handleGoHome} round="sm">
          홈으로 가기
        </PendingButton>
      </div>
    </div>
  );
};
