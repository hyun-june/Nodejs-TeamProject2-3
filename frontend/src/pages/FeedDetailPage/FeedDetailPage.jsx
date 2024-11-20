import { useState } from "react";
import { Avatar } from "../../components/shared/Avatar/Avatar";
import { Header } from "../../components/shared/Header/Header";
import { FeedBox } from "../FeedPage/components/FeedBox/FeedBox";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "./css/FeedDetailPage.css";

const testComment = [
  {
    nickName: "김철수",
    content: `이 편지는 영국에서 최초로 시작되어 일년에 
한바퀴를 돌면서 받는 사람에게 행운을 주었고 
지금은 당신에게로 옮겨진 이 편지는 4일 안에 
당신 곁을 떠나야 합니다. 이 편지를 포함해서 
7통을 행운이 필요한 사람에게 보내 주셔야 
합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 
모르지만 사실입니다.`,
    time: "4분전",
  },
  {
    nickName: "김똥개",
    content: "크아아아아아아아아아아아아아",
    time: "10분전",
  },
];

const maxLength = 30;

export const FeedDetailPage = () => {
  const [comments, setComments] = useState(testComment);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState({});

  const handleShowMoreClick = (index) => {
    setShowComment((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddComment = () => {
    if (newComment) {
      const newCommentText = {
        nickName: "새 사용자",
        content: newComment,
        time: "방금",
      };
      setComments([newCommentText, ...comments]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newComment) {
      handleAddComment();
    }
  };

  const handleCommentchange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="feed-detail-container">
      <Header backTo="/feed" title="게시물" />
      <FeedBox src="https://i.pinimg.com/1200x/e0/56/9e/e0569e322d27f3cd7ac3114e177546c4.jpg" />
      <div className="feed-comment-section">
        <Avatar />
        <input
          type="text"
          placeholder="댓글쓰기"
          onChange={handleCommentchange}
          onKeyPress={handleKeyPress}
          value={newComment}
        />
        <button onClick={handleAddComment}>
          <FaArrowAltCircleUp id="addComment-icon" />
        </button>
      </div>
      <ul>
        {comments.map((item, index) => {
          const isShow = showComment[index];
          const contentToShow = isShow
            ? item.content
            : item.content.length > maxLength
            ? item.content.slice(0, maxLength) + "..."
            : item.content;
          return (
            <li key={index}>
              <div className="feed-comment">
                <div>
                  <Avatar />
                </div>

                <div className="feed-comment-inner">
                  <div className="feed-comment-top">
                    <p>
                      <span> {item.nickName}</span>
                      <span> {item.time}</span>
                    </p>

                    <FaEllipsisVertical />
                  </div>

                  <div className="feed-content-inner">
                    {contentToShow}
                    {item.content.length > maxLength && (
                      <button onClick={() => handleShowMoreClick(index)}>
                        {isShow ? "접기" : "더 보기"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// import { useState, useEffect } from "react";
// import { Avatar } from "../../components/shared/Avatar/Avatar";
// import { Header } from "../../components/shared/Header/Header";
// import { FeedBox } from "../FeedPage/components/FeedBox/FeedBox";
// import { FaEllipsisVertical } from "react-icons/fa6";
// import { FaArrowAltCircleUp } from "react-icons/fa";
// import "./css/FeedDetailPage.css";

// // 예시 백엔드 API URL
// const apiUrl = "/api/comments";  // 백엔드 API URL을 여기에 설정

// const maxLength = 30;

// export const FeedDetailPage = () => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   // 컴포넌트가 마운트될 때 API로부터 댓글 데이터를 가져오기
//   useEffect(() => {
//     // 백엔드에서 댓글 데이터를 가져옴 (fetch 또는 axios 사용)
//     const fetchComments = async () => {
//       try {
//         const response = await fetch(apiUrl); // API 호출
//         const data = await response.json();
//         // 각 댓글에 isExpanded 필드를 추가하여 댓글 상태를 초기화
//         const commentsWithState = data.map((comment) => ({
//           ...comment,
//           isExpanded: false,
//         }));
//         setComments(commentsWithState);
//       } catch (error) {
//         console.error("댓글 데이터를 가져오는 데 실패했습니다:", error);
//       }
//     };

//     fetchComments();
//   }, []);

//   // 댓글 확장/축소 상태 변경
//   const handleShowMoreClick = (index) => {
//     setComments((prevComments) => {
//       return prevComments.map((comment, i) =>
//         i === index ? { ...comment, isExpanded: !comment.isExpanded } : comment
//       );
//     });
//   };

//   // 새로운 댓글 추가
//   const handleAddComment = async () => {
//     if (newComment) {
//       const newCommentText = {
//         nickName: "새 사용자",
//         content: newComment,
//         time: "방금",
//         isExpanded: false, // 새로운 댓글은 기본적으로 펼쳐지지 않음
//       };

//       try {
//         // 새로운 댓글을 서버에 보내는 API 호출 (POST)
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newCommentText),
//         });
//         const data = await response.json();
//         // 서버에서 댓글을 추가한 후, 댓글 상태를 업데이트
//         setComments([data, ...comments]);
//         setNewComment(""); // 댓글 입력란 초기화
//       } catch (error) {
//         console.error("댓글 추가에 실패했습니다:", error);
//       }
//     }
//   };

//   // 댓글 내용이 변경될 때
//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   // Enter 키로 댓글 추가
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && newComment) {
//       handleAddComment();
//     }
//   };

//   return (
//     <div className="feed-detail-container">
//       <Header backTo="/feed" title="게시물" />
//       <FeedBox src="https://i.pinimg.com/1200x/e0/56/9e/e0569e322d27f3cd7ac3114e177546c4.jpg" />
//       <div className="feed-comment-section">
//         <Avatar />
//         <input
//           type="text"
//           placeholder="댓글쓰기"
//           onChange={handleCommentChange}
//           onKeyPress={handleKeyPress}
//           value={newComment}
//         />
//         <button onClick={handleAddComment}>
//           <FaArrowAltCircleUp id="addComment-icon" />
//         </button>
//       </div>
//       <ul>
//         {comments.map((item, index) => {
//           const contentToShow = item.isExpanded
//             ? item.content
//             : item.content.length > maxLength
//             ? item.content.slice(0, maxLength) + "..."
//             : item.content;

//           return (
//             <li key={index}>
//               <div className="feed-comment">
//                 <div>
//                   <Avatar />
//                 </div>

//                 <div className="feed-comment-inner">
//                   <div className="feed-comment-top">
//                     <p>
//                       <span>{item.nickName}</span>
//                       <span>{item.time}</span>
//                     </p>

//                     <FaEllipsisVertical />
//                   </div>

//                   <div className="feed-content-inner">
//                     {contentToShow}
//                     {item.content.length > maxLength && (
//                       <button onClick={() => handleShowMoreClick(index)}>
//                         {item.isExpanded ? "접기" : "더 보기"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
