import { useNavigate } from "react-router-dom";
import "./FeedContainer.css";

export const FeedContainer = ({ feeds }) => {
  const navigate = useNavigate();
  const handleFeedClick = (id) => {
    navigate(`/feed/${id}`);
  };
  return (
    <div className="feed-grid">
      {feeds.map((feed) => (
        <div
          key={feed._id}
          className="feed-item"
          onClick={() => handleFeedClick(feed._id)}
        >
          <img src={feed.fileUrl} alt={feed.title} />
        </div>
      ))}
    </div>
  );
};
