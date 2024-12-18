import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthInput } from "../../components/shared/AuthInput/AuthInput";
import { Header } from "../../components/shared/Header/Header";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useInputDetail } from "../../core/query/auth";
import { useGetUserDetail, useUpdateUserDetail } from "../../core/query/user";
import { PendingButton } from "../../components/shared/PendingButton/PendingButton";
import "./css/UserDetailPage.css";

export const UserDetailPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [profileImgfile, setProfileImgfile] = useState(null);
  const { data: userDetails, isPending, error } = useGetUserDetail();
  const { mutate: inputUserDetail } = useInputDetail();
  const { mutate: updateUserDetail } = useUpdateUserDetail();
  useEffect(() => {
    if (userDetails?.data) {
      setValue("nickname", userDetails.data.nickname || "");
      setValue("age", userDetails.data.age || "");
      setValue("height", userDetails.data.height || "");
      setValue("weight", userDetails.data.weight || "");
      setValue("purpose", userDetails.data.purpose || "");

      // 프로필 이미지 URL 설정
      if (userDetails.data.profileImg) {
        setProfileImgUrl(userDetails.data.profileImg);
      }
    }
  }, [userDetails, setValue]);

  const onUserSubmit = async (formData) => {
    const userData = {
      profileUrl: profileImgfile || profileImgUrl,
      ...formData,
    };
    console.log("11", formData);

    if (userDetails?.data) {
      return updateUserDetail(userData);
    }
    inputUserDetail(userData);
  };

  const handleProfileDelete = () => {
    setProfileImgUrl("");
    setProfileImgfile(null);
  };

  const handleProfileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let profile = window.URL.createObjectURL(file);
      setProfileImgUrl(profile);
      setProfileImgfile(file);
    }
  };

  const handleAgeLimit = (e) => {
    let value = e.target.value;

    if (value && !/^\d{0,2}$/.test(value)) {
      e.target.value = value.slice(0, value.length - 1);
    }
  };

  const handleLimit = (e) => {
    let value = e.target.value;
    if (value && !/^\d{0,3}(\.\d{0,1})?$/.test(value)) {
      e.target.value = value.slice(0, value.length - 1);
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
          <AuthInput id="nickname" title="nickname" register={register} />
          <section className="detail-first-section">
            <AuthInput
              id="age"
              title="age"
              type="number"
              register={register}
              onChange={handleAgeLimit}
            />
            <AuthInput
              id="height"
              title="height"
              type="number"
              step="0.1"
              register={register}
              onChange={handleLimit}
            />
            <span>cm</span>
          </section>
          <section className="detail-second-section">
            <div className="weight-input">
              <AuthInput
                id="weight"
                title="weight"
                type="number"
                step="0.1"
                register={register}
                onChange={handleLimit}
              />
              <span>kg</span>
            </div>
            <div className="purpose-input">
              <AuthInput
                id="purpose"
                title="purpose"
                type="number"
                step="0.1"
                register={register}
                onChange={handleLimit}
              />
              <span>kg</span>
            </div>

            <PendingButton thema="point" round="sm" isPending={isPending}>
              {userDetails?.data ? "수정" : "저장"}
            </PendingButton>
            {userDetails?.data ? (
              <Link to="/user/me" className="detail-cancel-button">
                <PendingButton thema="point" round="sm" isPending={isPending}>
                  수정 취소
                </PendingButton>
              </Link>
            ) : (
              ""
            )}
          </section>
        </form>
      </div>
    </>
  );
};
