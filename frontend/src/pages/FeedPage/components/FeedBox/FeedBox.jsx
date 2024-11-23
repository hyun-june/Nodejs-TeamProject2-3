import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import { Avatar } from "../../../../components/shared/Avatar/Avatar";
import { timeText } from "../../../../core/constants/DateTimeFormat";
import { useDeleteFeed } from "../../../../core/query/feed.js";
import "./FeedBox.css";

export const FeedBox = ({ feed }) => {
  const [visible, setVisible] = useState({});
  const navigate = useNavigate();
  const feedDate = new Date(feed.createdAt);
  const feedId = feed._id;
  const handleMoveFeed = (feedId) => {
    navigate(`/feed/${feedId}`);
  };

  const { mutate: deleteFeed } = useDeleteFeed({ feedId });

  const handleFeedDelete = () => {
    console.log("삭제가능?");
  };

  return (
    <article className={location.pathname === "/feed" ? "feed-container" : ""}>
      <div className="feed-top">
        <div className="feed-top-text">
          <Avatar src={feed.userInfo.profileImg} isOnline />
          <div>
            <div>{feed.userInfo.nickname}</div>
            <span>Lv 0</span>
          </div>
        </div>
        <div className="feed-button">
          <FaEllipsisVertical onClick={() => setVisible((prev) => !prev)} />
          {visible && (
            <span onClick={handleFeedDelete} className="feed-delete-button">
              삭제
            </span>
          )}
        </div>
      </div>
      <picture className="feed-imgbox" onClick={() => handleMoveFeed(feedId)}>
        <img src={feed?.fileUrl} alt="" />
      </picture>

      <div className="feed-inner">
        <LikeButton />
        <div
          onClick={() => handleMoveFeed(feedId)}
          className={
            location.pathname === "/feed" ? "feed-text" : "feed-detail-text"
          }
        >
          <div>{feed?.description}</div>
        </div>
      </div>
      <div className="feed-tag-info">
        <div className="feed-tags-list">
          {feed?.hashtags.map((tag, index) => (
            <TagButton tagName={tag} key={index} />
          ))}
        </div>

        <span>{timeText(feedDate)}</span>
      </div>
    </article>
  );
};
