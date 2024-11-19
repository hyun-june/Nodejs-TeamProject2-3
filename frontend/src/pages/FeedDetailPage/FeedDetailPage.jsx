import { useState } from "react";
import { Avatar } from "../../components/shared/Avatar/Avatar";
import { Header } from "../../components/shared/Header/Header";
import { FeedBox } from "../FeedPage/components/FeedBox/FeedBox";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "./css/FeedDetailPage.css";

const testComment = [
  {
    nickName: "김철수",
    content: `이 편지는 영국에서 최초로 시작되어 일년에 
한바퀴를 돌면서 받는 사람에게 행운을 주었고 
지금은 당신에게로 옮겨진 이 편지는 4일 안에 
당신 곁을 떠나야 합니다. 이 편지를 포함해서 
7통을 행운이 필요한 사람에게 보내 주셔야 
합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 
모르지만 사실입니다.`,
    time: "4분전",
  },
  {
    nickName: "김똥개",
    content: "크아아아아아아아아아아아아아",
    time: "10분전",
  },
];

export const FeedDetailPage = () => {
  const [comments, setComments] = useState(testComment);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment) {
      const newCommentText = {
        nickName: "새 사용자",
        content: newComment,
        time: "방금",
      };
      setComments([newCommentText, ...comments]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newComment) {
      handleAddComment();
    }
  };

  const haddleCommentchange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="feed-detail-container">
      <Header backTo="/feed" title="게시물" />
      <FeedBox src="https://i.pinimg.com/1200x/e0/56/9e/e0569e322d27f3cd7ac3114e177546c4.jpg" />
      <div className="feed-comment-section">
        <Avatar />
        <input
          type="text"
          placeholder="댓글쓰기"
          className="feed-comment-input"
          onChange={haddleCommentchange}
          onKeyPress={handleKeyPress}
          value={newComment}
        />
        <button onClick={handleAddComment}>
          <FaArrowAltCircleUp id="addComment-icon" />
        </button>
      </div>
      <ul className="feed-comment">
        {comments.map((item, index) => (
          <li key={index} className="feed-another-section">
            <div className="feed-test">
              <div>
                <Avatar />
              </div>

              <div className="feed-another-comment">
                <div className="feed-feed">
                  <span className="feed-nickname">
                    <span> {item.nickName}</span>
                    <span> {item.time}</span>
                  </span>

                  <FaEllipsisVertical />
                </div>

                <span className="feed-content-inner">{item.content}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
