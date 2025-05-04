import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const VoteSection = ({ post }) => {
  const [voteStatus, setVoteStatus] = useState(0);
  const [voteCount, setVoteCount] = useState(Number(post.vote_count));

  const handleLike = () => {
    if (voteStatus === 1) {
      setVoteStatus(0);
      setVoteCount(voteCount - 1);
    } else {
      setVoteStatus(1);
      setVoteCount(voteStatus === -1 ? voteCount + 2 : voteCount + 1);
    }
  };

  const handleDislike = () => {
    if (voteStatus === -1) {
      setVoteStatus(0);
      setVoteCount(voteCount + 1);
    } else {
      setVoteStatus(-1);
      setVoteCount(voteStatus === 1 ? voteCount - 2 : voteCount - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLike}
        className={`transition-colors duration-150 ${
          voteStatus === 1
            ? "text-green-600"
            : "text-gray-400 hover:text-green-500"
        }`}
      >
        <ChevronUp size={20} />
      </button>
      <span className="text-sm font-medium text-green-700">{voteCount}</span>
      <button
        onClick={handleDislike}
        className={`transition-colors duration-150 ${
          voteStatus === -1
            ? "text-red-600"
            : "text-gray-400 hover:text-red-500"
        }`}
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
};

export default VoteSection;
