import millify from "millify";
import { useState } from "react";

const Description = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  const description = video?.description || "";
  const isTruncated = description.length > 100;
  const truncatedText = description.slice(0, 100);

  const text = isOpen || !isTruncated ? description : truncatedText + "...";

  return (
    <div className="mt-4 p-2 bg-[#3E403F] hover:opacity-95 transition rounded-md">
      <div className="flex gap-4 mb-2 text-sm text-gray-300">
        <p>
          {video?.viewCount ? `${millify(video.viewCount)} Views` : "No views"}
        </p>
        <p>
          {video?.publishDate
            ? new Date(video.publishDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "No date"}
        </p>
      </div>

      <p className="whitespace-pre-wrap text-white">
        {text}
        {isTruncated && !isOpen && (
          <span
            onClick={() => setIsOpen(true)}
            className="text-blue-400 hover:underline cursor-pointer ml-2"
          >
            See more
          </span>
        )}
        {isTruncated && isOpen && (
          <span
            onClick={() => setIsOpen(false)}
            className="text-blue-400 hover:underline cursor-pointer ml-2"
          >
            Show less
          </span>
        )}
      </p>
    </div>
  );
};

export default Description;