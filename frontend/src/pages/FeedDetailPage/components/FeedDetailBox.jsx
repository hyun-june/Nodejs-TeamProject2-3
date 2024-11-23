import { useNavigate } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { LikeButton } from "../../../components/Feed/LikeButton/LikeButton";
import { TagButton } from "../../FeedPage/components/TagButton/TagButton";
import { Avatar } from "../../../components/shared/Avatar/Avatar";
import { timeText } from "../../../core/constants/DateTimeFormat";

export const FeedDetailBox = ({ feed }) => {
  const navigate = useNavigate();
  const feedDate = new Date(feed.createdAt);
  const feedId = feed._id;
  const handleMoveFeed = (feedId) => {
    navigate(`/feed/${feedId}`);
  };

  return (
    <article className={location.pathname === "/feed" ? "feed-container" : ""}>
      <div className="feed-top">
        <div className="feed-top-text">
          <Avatar src={feed.user.detailInfo.profileImg} isOnline />
          <div>
            <div>{feed.user.detailInfo.nickname}</div>
            <span>Lv 0</span>
          </div>
        </div>
        <FaEllipsisVertical />
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
