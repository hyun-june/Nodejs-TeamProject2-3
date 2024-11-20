import { useState } from "react";
import { Header } from "../../components/shared/Header/Header";
import { AuthButton } from "../../components/shared/AuthButton/AuthButton";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import "./css/FeedCreatePage.css";

export const FeedCreatePage = () => {
  const [mainImageUrl, setMainImageUrl] = useState();
  const [mainImageFile, setMainImageFile] = useState(null);
  const [feedText, setFeedText] = useState("");
  const [tags, setTags] = useState([""]);

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    console.log("ff", file);
    if (file) {
      let image = window.URL.createObjectURL(file);
      setMainImageUrl(image);
      setMainImageFile(file);
    }
  };

  const handleFeedSubmit = async () => {
    console.log("뿌숑");
    console.log("tags", tags);

    // if (!mainImageFile) return alert("이미지가 선택되지 않았습니다.");

    // const feedData = new FormData();
    // feedData.append("feed-image", mainImageFile);
    // feedData.append("feed-text", feedText); // 텍스트 추가
    // feedData.append("feed-tags", tags);
    // try {
    //   const response = await fetch("/upload", {
    //     method: "POST",
    //     body: feedData,
    //   });
    //   if (!response.ok) {
    //     throw new Error("이미지 업로드 실패");
    //   }
    //   const data = await response.json();
    //   console.log("서버 데이터", data);
    // } catch (error) {
    //   console.log("이미지 업로드 실패", error);
    // }
  };

  const handleImageDelete = () => {
    setMainImageUrl("");
    setMainImageFile(null);
  };

  const handleTag = (index, value) => {
    const newTags = [...tags];
    newTags[index] = "#" + value.replace(/^#/, "");
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
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
          <img src={mainImageUrl} />
          <button onClick={handleImageDelete}>
            <IoCloseSharp className="feed-icon" />
          </button>
        </div>
      ) : (
        <section className="mainImageSection">
          <label htmlFor="mainImage">
            <FaPlus className="feed-icon" />
            <span>사진 넣기</span>
          </label>
          <input type="file" id="mainImage" onChange={handleImageChange} />
        </section>
      )}

      <section className="create-feed-inner">
        <textarea className="feed-textarea" placeholder="오늘 있었던 일..." />
        <section className="feed-create-tag">
          <div className="tag-title">
            <span>태그</span>
            <button onClick={handleAddTag}>
              <FaPlus className="feed-tag-icon" />
            </button>
          </div>
          <ul className="tags-list">
            {tags.map((tag, index) => (
              <li className="tags-section">
                <textarea
                  className="tags-textarea"
                  type="text"
                  value={tag}
                  placeholder="#"
                  onChange={(e) => handleTag(index, e.target.value)}
                />
                <button onClick={() => handleDeleteTag(index)}>
                  <IoCloseSharp className="feed-tag-icon" />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <AuthButton onClick={handleFeedSubmit} className="button-color_blue">
          올리기
        </AuthButton>
      </section>
    </div>
  );
};
