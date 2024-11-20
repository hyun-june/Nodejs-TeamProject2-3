import "./FeedContainer.css";

export const FeedContainer = ({ feeds }) => {
  return (
    <div className="feed-grid">
      {feeds.map((feed) => (
        <div key={feed.id} className="feed-item">
          <img src={feed.fileUrl} alt={feed.title} />
        </div>
      ))}
    </div>
  );
};
