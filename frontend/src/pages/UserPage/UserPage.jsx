import { useLocation } from "react-router-dom";
import { Avatar } from "../../components/shared/Avatar/Avatar.jsx";
import { Tabs } from "../../components/shared/Tabs/Tabs.jsx";
import { FeedContainer } from "./components/FeedContainer/FeedContainer.jsx";
import { useGetMyInfo } from "../../core/query/user.js";
import { BiSolidPencil } from "react-icons/bi";
import "./UserPage.css";

const TabContent1 = FeedContainer;
const TabContent2 = () => <div>탭 2의 내용입니다.</div>;

export const UserPage = () => {
  const { pathname } = useLocation();
  const { data, error, isPending } = useGetMyInfo();
  const isMyPage = pathname === "/user/me";

  console.log("쿼리데이터", data);
  const userdata = data?.user;

  const items = [
    {
      title: "FEED",
      comp: <TabContent1 feeds={userdata?.feed} />,
    },
    {
      title: "DASH BOARD",
      comp: <TabContent2 />,
    },
  ];

  if (isPending) return <>로딩중</>;
  if (error) return <>에러 발생: {error.message}</>;

  return (
    <div className="userpage-container">
      <div
        className={`userpage-wrapper ${isMyPage ? "has-button" : "no-button"}`}
      >
        <div className="profile-container">
          <Avatar isOnline={true} size="100" />
          <p className="info-content">{userdata.name}</p>
          <p className="useremail">{userdata.email}</p>
        </div>
        <div className="info-container">
          <div className="detail-info-container">
            <p className="info-content">{userdata.feed.length}</p>
            <p className="detail-info-text">FEED</p>
          </div>
          <div className="seperator"></div>
          <div className="detail-info-container">
            <p className="info-content">3KG</p>
            <p className="detail-info-text">목표까지</p>
          </div>
        </div>
        {isMyPage && (
          <div className="button-container">
            <button className="edit-userinfo-button">
              <p>내 정보 수정하기</p> <BiSolidPencil size="20" />
            </button>
          </div>
        )}
      </div>
      <div className="feed-container">
        <Tabs items={items} />
      </div>
    </div>
  );
};
