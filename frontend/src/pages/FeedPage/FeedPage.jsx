import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AddButton } from "../../components/shared/AddButton/AddButton";
import { SearchBar } from "../../components/shared/SearchBar/SearchBar";
import { FeedBox } from "./components/FeedBox/FeedBox";
import {
  useFeedSearchInfinite,
  useGetAllFeedInfinite,
} from "../../core/query/feed";
import { useInView } from "react-intersection-observer";
import "./css/FeedPage.css";

export const FeedPage = () => {
  const { search } = useLocation();

  const query = new URLSearchParams(search).get("q") || "";
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllFeedInfinite({ limit: 3 });

  const {
    data: feeds,
    isLoading: feedsLoading,
    isError: feedsError,
    fetchNextPage: fetchNextFeedPage,
    hasNextPage: hasNextFeedPage,
    isFetchingNextPage: isFetchNextFeedPage,
  } = useFeedSearchInfinite({ query, limit: 3 });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;

    if (query === "") {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    } else if (query) {
      if (hasNextFeedPage && !isFetchNextFeedPage) {
        fetchNextFeedPage();
      }
    }
  }, [
    inView,
    query,
    hasNextPage,
    isFetchingNextPage,
    hasNextFeedPage,
    isFetchNextFeedPage,
  ]);

  const feedData = query ? feeds : data;
  const pages = feedData?.pages || [];

  return (
    <div className="feed-inner-body">
      <div className="feed-main">
        <div className="feed-search">
          <SearchBar />
        </div>

        {pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data.map((feed, index) => (
              <FeedBox feed={feed} key={index} refetch={refetch} />
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
