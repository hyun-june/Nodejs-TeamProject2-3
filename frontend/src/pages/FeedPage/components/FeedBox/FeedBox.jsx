import { Link, useNavigate } from "react-router-dom";
import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import { Avatar } from "../../../../components/shared/Avatar/Avatar";
import { timeText } from "../../../../core/constants/DateTimeFormat";
import { IoEyeSharp } from "react-icons/io5";
import { registerFeedView } from "../../../../core/api/feed";
import { useMutation } from "@tanstack/react-query";
import {
  useIncreaseFeedView,
  useRegisterLike,
  useRegisterUnlike,
} from "../../../../core/query/feed";
import { useState } from "react";
import "./FeedBox.css";

export const FeedBox = ({ feed, refetch }) => {
  const navigate = useNavigate();
  const feedDate = new Date(feed.createdAt);
  const feedId = feed._id;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const currentUserId = sessionStorage.getItem("userId");

  // 좋아요 관련 상태 및 뮤테이션
  const { mutate: increaseFeedView } = useIncreaseFeedView();
  const { mutate: registerLike } = useRegisterLike();
  const { mutate: registerUnlike } = useRegisterUnlike();
  const [liked, setLiked] = useState(feed.likedBy.includes(currentUserId)); // 현재 사용자가 좋아요를 눌렀는지 여부
  const [likes, setLikes] = useState(feed.likes); // 좋아요 수

  // 좋아요 버튼 클릭 처리
  const handleLikeToggle = () => {
    if (liked) {
      // 좋아요 취소
      registerUnlike({ feedId, userId: currentUserId });
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      // 좋아요 등록
      registerLike({ feedId, userId: currentUserId });
      console.log("dddd", feedId, currentUserId);
      setLikes((prevLikes) => prevLikes + 1);
    }
    setLiked((prev) => !prev);
    refetch();
  };

  const handleMoveFeed = (feedId) => {
    increaseFeedView(feedId);
    navigate(`/feed/${feedId}`);
  };

  const handleToggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleFeedDelete = () => {
    console.log("삭제");
    setIsMenuVisible(false);
  };

  const profileLink =
    currentUserId === feed.userInfo.user
      ? "/user/me"
      : `/user/${feed.userInfo.user}`;

  return (
    <article className={location.pathname === "/feed" ? "feed-container" : ""}>
      <div className="feed-top">
        <div className="feed-top-text">
          <Link to={profileLink}>
            <Avatar src={feed.userInfo.profileImg} isOnline />
          </Link>
          <div>
            <div>{feed.userInfo.nickname}</div>
            <span>Lv 0</span>
          </div>
        </div>
        <div className="feed-button">
          <FaEllipsisVertical onClick={handleToggleMenu} />
          <span>
            {isMenuVisible && (
              <span className="feed-delete" onClick={() => handleFeedDelete()}>
                삭제
              </span>
            )}
          </span>
        </div>
      </div>
      <picture className="feed-imgbox" onClick={() => handleMoveFeed(feedId)}>
        <img src={feed?.fileUrl} alt="" />
      </picture>

      <div className="feed-inner">
        <div className="feed-inner-text">
          <LikeButton
            likes={likes}
            liked={liked}
            onLikeToggle={handleLikeToggle}
          />
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
