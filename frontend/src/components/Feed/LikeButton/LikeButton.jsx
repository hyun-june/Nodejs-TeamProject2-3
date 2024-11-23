import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./LikeButton.css";

export const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);

  const handleLikeUpDown = () => {
    setLikeStatus((status) => !status);
    setLikes((items) => items + (likeStatus ? -1 : 1));
    return status;
  };

  return (
    <div className="like-line">
      <button onClick={handleLikeUpDown}>
        <FaHeart className={likeStatus ? "like-icon liked" : "like-icon"} />
      </button>
      <span>{`${likes}`}</span>
    </div>
  );
};
