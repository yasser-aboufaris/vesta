import React, { useState } from "react";
import { MessageSquare, ChevronUp, ChevronDown, Flag } from "lucide-react";

const PostCard = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [voteStatus, setVoteStatus] = useState(0);
  const [voteCount, setVoteCount] = useState(post.votes || 0);

  const contentLengthLimit = 150;
  const isContentTooLong = post.content.length > contentLengthLimit;

  const toggleContent = () => {
    setShowFullContent((prevState) => !prevState);
  };

  const handleVote = (vote) => {
    if (voteStatus === vote) {
      setVoteStatus(0);
      setVoteCount(vote === 1 ? voteCount - 1 : voteCount + 1);
    } else {
      setVoteCount(voteCount + vote - voteStatus);
      setVoteStatus(vote);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <h2 className="text-lg font-medium text-black dark:text-gray-100">
          {post.title}
        </h2>

        <div className="mt-3 text-gray-700 dark:text-gray-300">
          {showFullContent ? (
            <p>{post.content}</p>
          ) : (
            <p>{post.content.slice(0, contentLengthLimit)}...</p>
          )}

          {isContentTooLong && (
            <button
              onClick={toggleContent}
              className="text-gray-500 dark:text-gray-400 text-sm mt-2 hover:underline focus:outline-none"
            >
              {showFullContent ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action bar with voting and interactions */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        {/* Voting system */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => handleVote(1)}
            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${
              voteStatus === 1 
                ? "text-orange-500" 
                : "text-gray-500 dark:text-gray-400"
            }`}
            aria-label="Upvote"
          >
            <ChevronUp size={20} />
          </button>
          
          <span className={`text-sm font-medium ${
            voteStatus === 1 ? "text-orange-500" : 
            voteStatus === -1 ? "text-blue-500" : 
            "text-gray-700 dark:text-gray-300"
          }`}>
            {voteCount}
          </span>
          
          <button 
            onClick={() => handleVote(-1)}
            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 ${
              voteStatus === -1 
                ? "text-blue-500" 
                : "text-gray-500 dark:text-gray-400"
            }`}
            aria-label="Downvote"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors duration-150">
            <MessageSquare size={16} />
            <span className="text-sm">{post.comments || 0} Comments</span>
          </button>
          
          <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-red-500 px-2 py-1 rounded transition-colors duration-150">
            <Flag size={16} />
            <span className="text-sm">Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;