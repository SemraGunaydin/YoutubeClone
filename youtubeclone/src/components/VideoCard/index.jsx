import millify from "millify";
import { useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video, isRow }) => {
  // State to handle hover effect on video
  const [isHover, setIsHover] = useState(false);

  // Determine which thumbnail to show: richThumbnail (animated) on hover, or normal thumbnail
  const thumbnail =
    isHover && video.richThumbnail
      ? video.richThumbnail[video.richThumbnail.length - 1].url
      : video.thumbnail[video.thumbnail.length - 1].url;

  return (
    <Link
      to={`/watch?v=${video.videoId}`}
      className={`cursor-pointer ${isRow && "row"}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Thumbnail Section */}
      <div>
        <img
          className="rounded-lg w-full h-full"
          src={thumbnail}
          alt="video-thumbnail"
        />
      </div>

      {/* Video Info Section */}
      <div className={`${!isRow && "mt-4"} flex gap-4`}>
        <img
          src={video.channelThumbnail?.[0]?.url}
          className="size-14 rounded-full"
          alt="channel-thumbnail"
        />
        <div>
          <h4 className="font-bold line-clamp-2">{video.title}</h4>
          <p className="text-gray-400">{video.channelTitle}</p>

          <div className="flex gap-3 items-center mt-2">
            {video.viewCount && (
              <p className="font-semibold text-gray-300">
                {millify(video.viewCount)}
                {!isRow && <span className="ml-2">views</span>}
              </p>
            )}
            {video.isLive ? (
              <p className="bg-red-500 py-0.5 px-2 rounded-lg text-white">
                Live
              </p>
            ) : (
              <p className="text-gray-400">
                {video.publishedTimeText}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;