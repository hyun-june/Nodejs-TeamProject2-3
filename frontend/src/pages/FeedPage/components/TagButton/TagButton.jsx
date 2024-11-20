import "./TagButton.css";

export const TagButton = ({ ...props }) => {
  return (
    <div>
      <button className="tag-button">#{props.tagName}</button>
    </div>
  );
};
