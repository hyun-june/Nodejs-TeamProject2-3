import { useForm } from "react-hook-form";
import { AuthInput } from "../../components/shared/AuthInput/AuthInput";
import { AuthButton } from "../../components/shared/AuthButton/AuthButton";
import "./css/UserDetailPage.css";

export const UserDetailPage = () => {
  const { register, handleSubmit } = useForm();

  const onUserSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  return (
    <div className="userDetailPage-Container">
      <form onSubmit={handleSubmit(onUserSubmit)}>
        <AuthInput id="nickname" title="닉네임" register={register} />
        <section className="detail-first-section">
          <AuthInput id="age" title="나이" type="number" register={register} />
          <AuthInput id="height" title="키" type="number" register={register} />
        </section>
        <section className="detail-second-section">
          <AuthInput
            id="weight"
            title="체중"
            type="number"
            register={register}
          />
          <AuthInput
            id="purpose weight"
            title="목표 체중"
            type="number"
            register={register}
          />
          <AuthButton type="submit" className="button-color_blue">
            저장
          </AuthButton>
        </section>
      </form>
    </div>
  );
};
