import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthInput } from "../../components/shared/AuthInput/AuthInput";
import { AuthButton } from "../../components/shared/AuthButton/AuthButton";
import { Header } from "../../components/shared/Header/Header";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { inputUserDetail } from "../../core/api/auth";
import "./css/UserDetailPage.css";

export const UserDetailPage = () => {
  const { register, handleSubmit } = useForm();
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [profileImgfile, setProfileImgfile] = useState(null);

  const onUserSubmit = async (formData) => {
    console.log("Form Data:", formData);
    const { nickname, age, height, weight, purpose } = formData;
    inputUserDetail({
      nickname,
      age,
      height,
      weight,
      purpose,
      profileUrl: profileImgfile,
    });
  };

  const handleProfileDelete = () => {
    setProfileImgUrl("");
    setProfileImgfile(null);
  };

  const handleProfileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    console.log("dd", file);
    if (file) {
      let profile = window.URL.createObjectURL(file);
      setProfileImgUrl(profile);
      setProfileImgfile(file);
    }
  };
  return (
    <>
      <Header title="개인정보 입력" />
      <div className="userDetailPage-Container">
        {profileImgUrl ? (
          <div className="profilePreview">
            <img src={profileImgUrl} />
            <button onClick={handleProfileDelete}>
              <IoCloseSharp className="profile-icon" />
            </button>
          </div>
        ) : (
          <section className="profile-Section">
            <label htmlFor="profileImage">
              <FaPlus className="profile-icon" />
              <span>사진 넣기</span>
            </label>
            <input
              type="file"
              id="profileImage"
              onChange={handleProfileChange}
            />
          </section>
        )}
        <form
          onSubmit={handleSubmit(onUserSubmit)}
          className="profileInfo-form"
        >
          <AuthInput id="nickname" title="닉네임" register={register} />
          <section className="detail-first-section">
            <AuthInput
              id="age"
              title="나이"
              type="number"
              register={register}
            />
            <AuthInput
              id="height"
              title="키"
              type="number"
              register={register}
            />
          </section>
          <section className="detail-second-section">
            <AuthInput
              id="weight"
              title="체중"
              type="number"
              register={register}
            />
            <AuthInput
              id="purpose"
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
    </>
  );
};
