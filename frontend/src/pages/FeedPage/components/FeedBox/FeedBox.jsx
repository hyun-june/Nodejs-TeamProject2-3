import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import { Avatar } from "../../../../components/shared/Avatar/Avatar";
import "./FeedBox.css";

const feedtext = `라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언
    귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다.
    라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다. 라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다.라이언 귀엽다. 라이언 귀엽다.`;

export const FeedBox = ({ src }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMoveFeed = (feedId) => [navigate(`/feed/${feedId}`)];

  return (
    <article className={location.pathname === "/feed" ? "feed-container" : ""}>
      <div className="feed-top">
        <div className="feed-top-text">
          <Avatar />
          <div>
            <div>유저 닉네임</div>
            <span>Lv 0</span>
          </div>
        </div>
        <FaEllipsisVertical />
      </div>
      <picture className="feed-imgbox">
        <img src={src} alt="" />
      </picture>

      <div className="feed-inner">
        <LikeButton />
        <div
          onClick={handleMoveFeed}
          className={
            location.pathname === "/feed" ? "feed-text" : "feed-detail-text"
          }
        >
          <div>{feedtext}</div>
        </div>
      </div>
      <div className="feed-tag-info">
        <div className="feed-tags-list">
          <TagButton tagName="뿌숑" />
          <TagButton tagName="뿌숑" />
          <TagButton tagName="뿌우우우우" />
        </div>

        <span>몇 시간전</span>
      </div>
    </article>
  );
};
