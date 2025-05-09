import { AiFillLike, AiFillDislike } from "react-icons/ai";
import millify from "millify";

const ChannelInfo = ({ video }) => {
  return (
    <div className="flex justify-between max-sm:flex-col">
      {/* Sol Alan */}
      <div className="flex items-center gap-3">
        <div className="flex gap-2 sm:gap-4 items-center">
          <img
            src={video?.channelThumbnail?.[0]?.url}
            className="size-10 rounded-full sm:size-12"
            alt="channel-image"
          />

          <div>
            <h4 className="font-bold">{video?.channelTitle}</h4>
            <p className="text-gray-400">{video?.subscriberCountText}</p>
          </div>
        </div>
        <button className="bg-white text-black px-3 py-1 sm:py-2 hover:bg-gray-400 transition rounded-full">
          Abone Ol
        </button>
      </div>

      {/* Sağ Alan */}
      <div className="flex items-center bg-[#3E403F] rounded-full cursor-pointer max-sm:mt-3 max-sm:w-fit">
        {/* Like */}
        <div className="flex py-1 px-3 sm:py-2 sm:px-4 items-center gap-2 font-bold border-r border-gray-500">
          <AiFillLike />
          <span>{millify(Number(video?.likeCount || 0))}</span>
        </div>

        {/* Dislike */}
        <div className="flex py-1 px-3 sm:py-2 sm:px-4 items-center">
          <AiFillDislike />
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;