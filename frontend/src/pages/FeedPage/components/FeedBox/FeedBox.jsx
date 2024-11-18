import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import { Avatar } from "../../../../components/shared/Avatar/Avatar";
import { useState } from "react";
import "./FeedBox.css";

const feedtext = `라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언
    귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다.
    라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다. 라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
    귀엽다.라이언 귀엽다. 라이언 귀엽다.`;

const maxLength = 80;

export const FeedBox = ({ src }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setIsShowMore(!isShowMore);
  };

  const displayedText = isShowMore ? feedtext : feedtext.slice(0, maxLength);
  return (
    <article>
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
        <div className={`feed-text ${isShowMore ? "show-more" : ""}`}>
          <span>
            {displayedText}
            {feedtext.length > maxLength && !isShowMore && ""}
          </span>
          <span
            onClick={handleShowMoreClick}
            className={isShowMore && "closeText"}
          >
            {isShowMore ? "[접기]" : "...[더보기]"}
          </span>
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
