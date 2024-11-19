import { Link, useNavigate } from "react-router-dom";
import { AddButton } from "../../components/shared/AddButton/AddButton";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FeedBox } from "./components/FeedBox/FeedBox";
import "./css/FeedPage.css";

const testImg = [
  "https://i.pinimg.com/1200x/e0/56/9e/e0569e322d27f3cd7ac3114e177546c4.jpg",
  "https://blog.kakaocdn.net/dn/bezjux/btqCX8fuOPX/6uq138en4osoKRq9rtbEG0/img.jpg",
  "https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg",
];

export const FeedPage = () => {
  const navigate = useNavigate();

  const handleFeedClick = (feedId) => {
    navigate(`/feed/${feedId}`);
  };
  return (
    <div className="feed-inner-body">
      <div className="feed-main">
        <SearchBar />

        {testImg?.map((item, index) => (
          <FeedBox src={item} key={index} />
        ))}

        <Link to="/feed-create">
          <AddButton />
        </Link>
      </div>
    </div>
  );
};
