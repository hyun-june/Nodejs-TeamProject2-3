import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./LikeButton.css";

export const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);

  const handleLikeUpDown = () => {
    setLikeStatus((status) => !status);
    setLikes((items) => items + (likeStatus ? -1 : 1));
  };

  return (
    <div className="like-line">
      <button onClick={handleLikeUpDown}>
        <FaHeart id="like-icon" />
      </button>
      <span>{`좋아요 ${likes}개`}</span>
    </div>
  );
};
