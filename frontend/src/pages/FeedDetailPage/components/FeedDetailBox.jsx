import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { LikeButton } from "../../../components/Feed/LikeButton/LikeButton"; // LikeButton 컴포넌트 추가
import { Avatar } from "../../../components/shared/Avatar/Avatar";
import { timeText } from "../../../core/constants/DateTimeFormat";
import { IoEyeSharp } from "react-icons/io5";
import {
  useIncreaseFeedView,
  useRegisterLike,
  useRegisterUnlike,
} from "../../../core/query/feed";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteFeed } from "../../../core/query/feed";
import { PendingButton } from "../../../components/shared/PendingButton/PendingButton";
import { TagButton } from "../../FeedPage/components/TagButton/TagButton";

export const FeedDetailBox = ({ feed, refetch }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const navigate = useNavigate();
  const feedDate = new Date(feed.createdAt);

  const feedId = feed._id;

  // 좋아요 관련 상태 및 뮤테이션
  const currentUserId = sessionStorage.getItem("userId");
  const { mutate: increaseFeedView } = useIncreaseFeedView();
  const { mutate: registerLike } = useRegisterLike();
  const { mutate: registerUnlike } = useRegisterUnlike();
  const [liked, setLiked] = useState(feed.likedBy.includes(currentUserId)); // 좋아요 여부
  const [likes, setLikes] = useState(feed.likes); // 좋아요 수

  // 좋아요 버튼 클릭 시 처리
  const handleLikeToggle = () => {
    if (liked) {
      // 좋아요 취소
      registerUnlike({ feedId, userId: currentUserId });
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      // 좋아요 등록
      registerLike({ feedId, userId: currentUserId });
      setLikes((prevLikes) => prevLikes + 1);
    }
    setLiked((prev) => !prev); // 상태 토글

    refetch();
  };

  const { mutate, isPending } = useDeleteFeed();

  const handleMoveFeed = (feedId) => {
    increaseFeedView(feedId); // 조회수 증가
    navigate(`/feed/${feedId}`); // 피드 상세 페이지로 이동
  };

  const handleToggleMenu = () => {
    setIsDetailVisible((prev) => !prev);
  };

  const handleFeedDelete = () => {
    mutate(feedId, {
      onSuccess: () => {
        navigate(-1);
      },
    });
    setIsDetailVisible(false);
  };

  return (
    <article className="feed-container">
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
                  <span>
                    <PendingButton
                      className="feed-delete"
                      onClick={handleFeedDelete}
                      isPending={isPending}
                    >
                      <FaTrashAlt />
                      삭제하기
                    </PendingButton>
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
          {/* LikeButton 컴포넌트에 likes와 liked 상태 전달 */}
          <LikeButton
            likes={likes} // 좋아요 수
            liked={liked} // 좋아요 여부
            onLikeToggle={handleLikeToggle} // 좋아요 클릭 시 호출될 함수
          />
          <div className="feed-view-section">
            <IoEyeSharp className="feed-view-icon" />
            <span>{feed.views}</span>
          </div>
        </div>

        <div
          onClick={() => handleMoveFeed(feedId)}
          className="feed-detail-text"
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
