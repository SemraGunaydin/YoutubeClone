import { useEffect, useState } from "react";
import api from "../../utils/api";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    setIsLoading(true);
    api
      .get("/comments", { params: { id: videoId } })
      .then((res) => setComments(res.data))
      .catch((err) => console.log("Failed to fetch comments:", err))
      .finally(() => setIsLoading(false));
  }, [videoId]);

  return (
    <div className="my-6">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h2 className="text-xl font-bold">
            {comments?.commentsCount || 0} Comments
          </h2>

          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-[#3E403F] p-2 mb-5"
          />

          {comments?.data?.map((comment, index) => (
            <div
              className="flex gap-2 sm:gap-3 items-start px-1 py-3 sm:py-4"
              key={index}
            >
              <img
                src={comment?.authorThumbnail?.[0]?.url}
                className="size-8 rounded-full sm:size-10"
                alt="user-avatar"
              />

              <div>
                {/* Header */}
                <h5 className="flex gap-2 items-center">
                  <span className="font-bold">{comment?.authorText}</span>
                  <span className="text-gray-500 text-sm">
                    {comment?.publishedTimeText}
                  </span>
                </h5>

                {/* Comment Text */}
                <p className="whitespace-pre-wrap">{comment?.textDisplay}</p>

                {/* Like & Dislike */}
                <div className="flex items-center gap-5 mt-2">
                  <div className="flex items-center gap-1 hover:bg-gray-700 p-1 px-2 rounded cursor-pointer">
                    <AiFillLike />
                    <span>{comment?.likesCount || 0}</span>
                  </div>
                  <div className="hover:bg-gray-700 p-1 px-2 rounded cursor-pointer">
                    <AiFillDislike />
                  </div>
                  <span className="hover:bg-gray-700 p-1 px-2 rounded cursor-pointer">
                    Reply
                  </span>
                </div>

                {/* Replies */}
                {comment?.replyCount > 0 && (
                  <div className="mt-2 flex w-fit items-center p-1 rounded-md gap-2 text-blue-500 hover:bg-[#3E403F] cursor-pointer">
                    <TiArrowSortedDown />
                    {comment?.replyCount} Replies
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;