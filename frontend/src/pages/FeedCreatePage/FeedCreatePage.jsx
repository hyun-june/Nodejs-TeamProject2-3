import { useState } from "react";
import { Header } from "../../components/shared/Header/Header";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useCreateFeed } from "../../core/query/feed";
import "./css/FeedCreatePage.css";
import { PendingButton } from "../../components/shared/PendingButton/PendingButton";

export const FeedCreatePage = () => {
  const [mainImageUrl, setMainImageUrl] = useState();
  const [mainImageFile, setMainImageFile] = useState(null);
  const [feedText, setFeedText] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const { mutate: createFeed, isPending, isError, error } = useCreateFeed();

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let image = window.URL.createObjectURL(file);
      setMainImageUrl(image);
      setMainImageFile(file);
    }
  };

  const handleFeedSubmit = () => {
    createFeed({
      fileUrl: mainImageFile,
      description: feedText,
      hashtags: tags,
    });
  };

  const handleImageDelete = () => {
    setMainImageUrl("");
    setMainImageFile(null);
  };

  const handleAddTag = () => {
    const inputTag = newTag.trim();

    if (!inputTag) return;
    if (!tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className="create-feed-container">
      <Header backTo="/feed" title="새로운 피드" />

      {mainImageUrl ? (
        <div className="mainImagePreview">
          <img src={mainImageUrl} alt="Preview" />
          <button onClick={handleImageDelete}>
            <IoCloseSharp className="feed-icon" />
          </button>
        </div>
      ) : (
        <div className="mainImageSection">
          <label htmlFor="mainImage">
            <FaPlus className="feed-icon" />
            <span>사진 넣기</span>
          </label>
          <input type="file" id="mainImage" onChange={handleImageChange} />
        </div>
      )}

      <div className="create-feed-inner">
        <textarea
          placeholder="오늘 있었던 일..."
          value={feedText}
          onChange={(e) => setFeedText(e.target.value)}
        />
        <div className="feed-create-tag">
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                <p>#</p>
                <span>{tag}</span>
                <button onClick={() => handleDeleteTag(index)}>
                  <IoCloseSharp />
                </button>
              </li>
            ))}
            <div>
              <span>#</span>
              <input
                type="text"
                value={newTag}
                placeholder="태그"
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              />
              <button onClick={handleAddTag}>
                <FaPlus />
              </button>
            </div>
          </ul>
        </div>

        <PendingButton
          onClick={handleFeedSubmit}
          isPending={isPending}
          round="sm"
          thema="point"
        >
          올리기
        </PendingButton>
      </div>
    </div>
  );
};
