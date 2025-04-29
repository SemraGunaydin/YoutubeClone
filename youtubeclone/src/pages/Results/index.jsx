import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../../components/VideoCard";
import ErrorComponent from "../../components/Error";
import { BasicLoader } from "../../components/Loader";
import api from "../../utils/api";

const Results = () => {
  // States
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);

  // Get query from URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  // Prepare API parameters
  const params = {
    query,
    token: page > 1 ? token : null,
  };

  // Fetch data when query or page changes
  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setError(null);

    api
      .get("/search", { params })
      .then((res) => {
        setData((prev) => [...prev, ...res.data.data]);
        setToken(res.data.continuation);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  return (
    <div className="p-4 sm:p-6 md:p-10 h-[93vh] overflow-y-auto">
      {error ? (
        <ErrorComponent info={error} />
      ) : isLoading && page === 1 ? (
        <BasicLoader />
      ) : (
        <>
          <h2 className="mb-5 text-xl">
            Results for <span className="font-bold">{query}</span>
          </h2>

          <div className="wrapper flex flex-col gap-5 justify-center">
            {data.map(
              (item, index) =>
                item.type === "video" && <VideoCard key={index} video={item} isRow />
            )}
          </div>

          {token && (
            <div className="flex justify-center">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-zinc-600 py-2 px-5 rounded-md my-10 hover:bg-zinc-800 transition"
              >
                See more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Results;
