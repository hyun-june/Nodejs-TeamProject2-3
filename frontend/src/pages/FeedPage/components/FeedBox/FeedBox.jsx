import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import { Avatar } from "../../../../components/shared/Avatar/Avatar";
import "./FeedBox.css";
import { timeText } from "../../../../core/constants/DateTimeFormat";

const feedtext = `라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언
    귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다.
    라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다. 라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다.라이언 귀엽다. 라이언 귀엽다.`;

export const FeedBox = ({ feed }) => {
  console.log("222", feed);
  const location = useLocation();
  const navigate = useNavigate();

  const feedDate = new Date(feed.createdAt);

  const handleMoveFeed = (feedId) => [navigate(`/feed/${feedId}`)];

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
        <FaEllipsisVertical />
      </div>
      <picture className="feed-imgbox" onClick={handleMoveFeed}>
        <img src={feed?.fileUrl} alt="" />
      </picture>

      <div className="feed-inner">
        <LikeButton />
        <div
          onClick={handleMoveFeed}
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
