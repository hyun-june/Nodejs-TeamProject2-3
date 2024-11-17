import "./Avatar.css";

export const Avatar = ({ src, isOnline, size = 40, style, ...props }) => {
  return (
    <div
      className="avatar-container"
      style={{ width: `${size}px`, ...style }}
      {...props}
    >
      <img
        className="avatar-image"
        src={src || "basic-profile.png"}
        alt="프로필 이미지"
      />
      <div className={`avatar-status ${isOnline ? "online" : "offline"}`}></div>
    </div>
  );
};
