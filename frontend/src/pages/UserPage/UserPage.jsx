import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/shared/Header/Header.jsx";
import { Avatar } from "../../components/shared/Avatar/Avatar.jsx";
import { Tabs } from "../../components/shared/Tabs/Tabs.jsx";
import { FeedContainer } from "./components/FeedContainer/FeedContainer.jsx";
import { useGetMyInfo, useGetOtherInfo } from "../../core/query/user.js";
import { useGetAllFeed } from "../../core/query/feed.js";
import { BiSolidPencil } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import "./UserPage.css";

const TabContent1 = FeedContainer;

export const UserPage = ({ handleLogout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let { userId } = useParams();
  const isMyPage = pathname === "/user/me";

  const useGetInfo = (isMyPage) => {
    return isMyPage ? useGetMyInfo() : useGetOtherInfo(userId);
  };
  const {
    data: userData,
    error: userError,
    isPending: userIsPending,
  } = useGetInfo(isMyPage);
  const userdata = userData?.user;

  if (isMyPage) {
    userId = userdata?._id;
  }

  const {
    data: feedData,
    error: feedError,
    isPending: feedIsPending,
  } = useGetAllFeed({ userId });
  const feeddata = feedData?.data;

  const items = [
    {
      title: "FEED",
      comp: <TabContent1 feeds={feeddata} />,
    },
  ];

  if (userIsPending || feedIsPending) return <>로딩중</>;
  // if (userError || feedError)
  //   return (
  //     <>
  //       에러 발생: {userError.message}
  //       {feedError.message}
  //     </>
  //   );

  const handleEditButtonClick = () => {
    navigate("/user/detail");
  };

  return (
    <>
      {!isMyPage && <Header backTo={-1} />}
      <div className="userpage-container">
        <div
          className={`userpage-wrapper ${
            isMyPage ? "has-button" : "no-button"
          }`}
        >
          <div className="profile-container">
            <Avatar
              src={userdata.detailInfo?.profileImg}
              isOnline={true}
              size="100"
            />
            {isMyPage && (
              <div className="logout" onClick={() => handleLogout()}>
                <FiLogOut size="22" color="var(--light-gray-color)" />
              </div>
            )}

            <p className="info-content">{userdata.detailInfo?.nickname}</p>
            <p className="useremail">{userdata.email}</p>
          </div>
          <div className="info-container">
            <div className="detail-info-container">
              <p className="info-content">{feeddata.length}</p>
              <p className="detail-info-text">FEED</p>
            </div>
            <div className="seperator"></div>
            <div className="detail-info-container">
              <p className="info-content">
                {userdata.detailInfo?.weight - userdata.detailInfo?.purpose}KG
              </p>
              <p className="detail-info-text">목표까지</p>
            </div>
          </div>
          {isMyPage && (
            <button
              className="edit-userinfo-button"
              onClick={handleEditButtonClick}
            >
              <p>내 정보 수정하기</p> <BiSolidPencil size="20" />
            </button>
          )}
        </div>
        <div className="feed-container">
          <Tabs items={items} />
        </div>
      </div>
    </>
  );
};
