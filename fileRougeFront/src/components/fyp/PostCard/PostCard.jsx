import React, { useState } from "react";
import { MessageSquare, Flag } from "lucide-react";
import VoteSection from "./VoteSection";
import CommentsSection from "./CommentsSection";

const PostCard = ({ post, userVote }) => {
  const [showFull, setShowFull] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const handleReport = () => console.log("Reported!");

  return (
    <div className="bg-white rounded-lg border border-green-300 mb-4 shadow-md">
      <div className="p-5">
        <h2 className="text-xl font-semibold text-green-700 mb-3">
          {post.title}
        </h2>
        <p className="text-gray-700">
          {showFull
            ? post.content
            : post.content.slice(0, 150) +
              (post.content.length > 150 ? "…" : "")}
        </p>

        {!showFull && post.content.length > 150 && (
          <button
            onClick={() => setShowFull(true)}
            className="mt-3 px-3 py-1 text-sm bg-green-500 text-white rounded"
          >
            Read More
          </button>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-green-50">
        <VoteSection post={post} userVote={userVote} />

        <div className="flex gap-4 text-gray-500">
          <button
            onClick={() => setIsCommenting(true)}
            className="flex items-center gap-1 hover:text-green-600"
          >
            <MessageSquare size={16} />
            <span className="text-sm">Comment</span>
          </button>
          <button
            onClick={handleReport}
            className="flex items-center gap-1 hover:text-red-600"
          >
            <Flag size={16} />
            <span className="text-sm">Report</span>
          </button>
        </div>
      </div>

      <CommentsSection
        post={post}
        isOpen={isCommenting}
        onClose={() => setIsCommenting(false)}
      />
    </div>
  );
};

export default PostCard;
