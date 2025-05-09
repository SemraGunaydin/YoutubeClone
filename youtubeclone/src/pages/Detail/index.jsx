import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import ReactPlayer from "react-player";
import ChannelInfo from "../../components/ChannelInfo";
import Description from "../../components/Description";
import Comments from "../../components/Comments";
import VideoCard from "../../components/VideoCard";
import ErrorComponent from "../../components/Error";
import { BasicLoader } from "../../components/Loader";

const Detail = () => {
  const [searchParams] = useSearchParams();

  // States for video, loading, and error
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the video ID from URL
  const id = searchParams.get("v");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const params = { id, extend: 1 };

    api
      .get("/video/info", { params })
      .then((res) => setVideo(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="detail-page h-screen overflow-auto">
      {error ? (
        <ErrorComponent info={error} />
      ) : loading ? (
        <BasicLoader />
      ) : (
        <div className="page-content">
          {/* Video Player */}
          <div className="h-[30vh] md:h-[50vh] lg:h-[60vh] rounded overflow-hidden">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              height="100%"
              width="100%"
              controls
            />
          </div>

          {/* Video Info Section */}
          <div>
            {/* Title */}
            <h1 className="my-3 text-xl font-bold line-clamp-2">
              {video?.title}
            </h1>

            {/* Channel Info */}
            <ChannelInfo video={video} />

            {/* Description */}
            <Description video={video} />

            {/* Comments */}
            <Comments videoId={id} />
          </div>

          {/* Related Videos */}
          <div className="flex flex-col gap-5 p-1 mt-6">
            {video?.relatedVideos?.data.map(
              (item, key) =>
                item.type === "video" && (
                  <VideoCard video={item} key={key} isRow />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;