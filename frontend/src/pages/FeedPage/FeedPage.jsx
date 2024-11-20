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

// import { useEffect } from "react";
// import { useGetTestAll } from "../../core/hooks/useFeed";
// import { useInView } from "react-intersection-observer";

// export const FeedPage = () => {
//   const {
//     data,
//     isLoading,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchNextPage,
//   } = useGetTestAll();
//   console.log("ddd", data);
//   const { ref, inView } = useInView();
//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchNextPage) {
//       fetchNextPage();
//     }
//   }, [inView]);

//   return (
//     <div>
//       {data?.pages?.map((page, pageIndex) => (
//         <div key={pageIndex}>
//           {page.results.map((item, index) => (
//             <div key={index}>
//               <h3>{item.title}</h3>
//             </div>
//           ))}
//         </div>
//       ))}
//       {data?.pages?.map((page, pageIndex) => (
//         <div key={pageIndex}>
//           {page.results.map((item, index) => (
//             <div key={index}>
//               <h3>{item.title}</h3>
//             </div>
//           ))}
//         </div>
//       ))}

//       <h1 ref={ref}>확인</h1>
//     </div>
//   );
// };
