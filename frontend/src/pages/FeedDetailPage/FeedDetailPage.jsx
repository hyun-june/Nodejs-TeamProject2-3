import { useState } from "react";
import { Avatar } from "../../components/shared/Avatar/Avatar";
import { Header } from "../../components/shared/Header/Header";
import { FeedDetailBox } from "./components/FeedDetailBox";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import {
  useDeleteComment,
  useGetDetailFeed,
  useUpdateComment,
} from "../../core/query/feed";

import { useParams } from "react-router-dom";
import { timeText } from "../../core/constants/DateTimeFormat";
import "./css/FeedDetailPage.css";

const maxLength = 30;

export const FeedDetailPage = () => {
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState({});
  const [visible, setVisible] = useState({});
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetDetailFeed(id);
  const { mutate: deleteComments } = useDeleteComment({ id });

  const recentComments = data?.comments
    ? [...data.comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const {
    mutate: updateComments,
    isLoading: commentLoading,
    isError: commentIsError,
    error: commentError,
  } = useUpdateComment({ id });

  if (isLoading || commentLoading) {
    return <div>Loading...</div>;
  }

  if (isError || commentIsError) {
    return <div>Error: {error?.message || "Failed to load feed"}</div>;
  }

  const { nickname, profileImg } = data?.userInfo;

  const handleShowMoreClick = (index) => {
    setShowComment((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddComment = async () => {
    if (newComment) {
      const newCommentText = {
        nickName: nickname,
        content: newComment,
        time: "방금",
      };
      await updateComments({ id, newCommentText });
      setNewComment("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newComment) {
      handleAddComment();
    }
  };

  const handleCommentInput = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentDelete = (id, commentId) => {
    deleteComments({ id, commentId });
  };

  const toggleVisible = (index) => {
    setVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="feed-detail-container">
      <Header backTo="/feed" title="게시물" />
      <FeedDetailBox feed={data} />
      <div className="feed-comment-section">
        <Avatar src={profileImg} isOnline={true} />
        <input
          type="text"
          placeholder="댓글쓰기"
          onChange={handleCommentInput}
          onKeyPress={handleKeyPress}
          value={newComment}
        />
        <button onClick={handleAddComment}>
          <FaArrowAltCircleUp id="addComment-icon" />
        </button>
      </div>
      <ul>
        {recentComments.map((item, index) => {
          const isShow = showComment[index];
          const contentToShow = isShow
            ? item.content
            : item.content.length > maxLength
            ? item.content.slice(0, maxLength) + "..."
            : item.content;

          const commentDate = new Date(item.createdAt);
          const timeAgoText = timeText(commentDate);

          return (
            <li key={item._id}>
              <div className="feed-comment">
                <div>
                  <Avatar src={item.userInfo.profileImg} isOnline={true} />
                </div>

                <div className="feed-comment-inner">
                  <div className="feed-comment-top">
                    <p>
                      <span> {item.userInfo.nickname}</span>
                      <span> {timeAgoText}</span>{" "}
                    </p>
                    <div className="comment-button">
                      <FaEllipsisVertical
                        onClick={() => toggleVisible(index)}
                      />
                      <span>
                        {visible[index] && (
                          <span
                            className="comment-delete"
                            onClick={() => handleCommentDelete(id, item._id)}
                          >
                            삭제
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="feed-content-inner">
                    {contentToShow}
                    {item.content.length > maxLength && (
                      <button onClick={() => handleShowMoreClick(index)}>
                        {isShow ? "...접기" : "더보기"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <div className="feed-end-comment">더 이상 댓글이 없습니다.</div>
      </ul>
    </div>
  );
};
