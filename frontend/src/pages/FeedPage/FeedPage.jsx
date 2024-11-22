import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AddButton } from "../../components/shared/AddButton/AddButton";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FeedBox } from "./components/FeedBox/FeedBox";
import { useGetAllFeed } from "../../core/query/feed";
import { useInView } from "react-intersection-observer";
import "./css/FeedPage.css";

export const FeedPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchNextPage,
  } = useGetAllFeed();
  console.log("ddd", data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="feed-inner-body">
      <div className="feed-main">
        <SearchBar />

        {data?.pages?.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data.map((feed, index) => (
              <FeedBox feed={feed} key={index} />
            ))}
          </div>
        ))}

        <Link to="/feed-create">
          <AddButton />
        </Link>
      </div>
      <span ref={ref}></span>
    </div>
  );
};
