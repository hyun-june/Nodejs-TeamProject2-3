import { LikeButton } from "../../../../components/Feed/LikeButton/LikeButton";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TagButton } from "../TagButton/TagButton";
import "./FeedBox.css";

export const FeedBox = ({ src }) => {
  return (
    <article>
      <div className="feed-top">
        <div className="feed-top-text">
          <div className="circle"></div>
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
      <div className="feed-text">
        <LikeButton />
        <span>
          라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언
          귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다.
          라이언 귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
          귀엽다. 라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
          귀엽다.라이언 귀엽다. 라이언 귀엽다.라이언 귀엽다. 라이언
          귀엽다.라이언 귀엽다. 라이언 귀엽다.
        </span>
        <TagButton />
        <span>몇 시간전</span>
      </div>
    </article>
  );
};
