import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { LikeButton } from "../../../components/Feed/LikeButton/LikeButton";
import { TagButton } from "../../FeedPage/components/TagButton/TagButton";
import { Avatar } from "../../../components/shared/Avatar/Avatar";
import { timeText } from "../../../core/constants/DateTimeFormat";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteFeed } from "../../../core/query/feed";

export const FeedDetailBox = ({ feed }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const navigate = useNavigate();
  const feedDate = new Date(feed.createdAt);
  const currentUserId = sessionStorage.getItem("userId");
  const feedId = feed._id;

  const { mutate } = useDeleteFeed();

  const handleMoveFeed = (feedId) => {
    navigate(`/feed/${feedId}`);
  };

  const handleToggleMenu = () => {
    setIsDetailVisible((prev) => !prev);
  };

  const handleFeedDelete = () => {
    mutate(feedId, {
      onSuccess: () => {
        navigate("/feed");
      },
    });
    setIsDetailVisible(false);
  };

  return (
    <article className={location.pathname === "/feed" ? "feed-container" : ""}>
      <div className="feed-top">
        <div className="feed-top-text">
          <Link to={`/user/${feed.userInfo.user}`}>
            <Avatar src={feed?.user?.detailInfo?.profileImg} />
          </Link>

          <div className="feed-username">
            {feed?.user?.detailInfo?.nickname}
          </div>
        </div>
        <div className="feed-button">
          {currentUserId === feed.user.detailInfo.user && (
            <>
              <FaEllipsisVertical onClick={handleToggleMenu} />
              <span>
                {isDetailVisible && (
                  <span className="feed-delete" onClick={handleFeedDelete}>
                    <FaTrashAlt />
                    삭제하기
                  </span>
                )}
              </span>
            </>
          )}
        </div>
      </div>
      <picture className="feed-imgbox" onClick={() => handleMoveFeed(feedId)}>
        <img src={feed?.fileUrl} alt="" />
      </picture>

      <div className="feed-inner">
        <div className="feed-inner-text">
          <LikeButton />
          <div className="feed-view-section">
            <IoEyeSharp className="feed-view-icon" />
            <span>{feed.views}</span>
          </div>
        </div>

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
