import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./LikeButton.css";

export const LikeButton = ({ likes, liked, onLikeToggle }) => {
  // const [likes, setLikes] = useState(0);
  // const [likeStatus, setLikeStatus] = useState(false);

  // // const handleLikeUpDown = () => {
  //   setLikeStatus((status) => !status);
  //   setLikes((items) => items + (likeStatus ? -1 : 1));
  //   return status;
  // };

  return (
    <div className="like-line">
      <button onClick={onLikeToggle}>
        <FaHeart className={liked ? "like-icon liked" : "like-icon"} />
      </button>
      <span>{`${likes}`}</span>
    </div>
  );
};
