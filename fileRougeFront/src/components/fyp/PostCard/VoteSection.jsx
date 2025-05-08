import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const VoteSection = ({ post, userVote }) => {
  const [voteStatus, setVoteStatus] = useState(userVote ?? 0);
  const [voteCount, setVoteCount] = useState(Number(post.vote_count));

  const handleVote = async (type) => {
    // Update UI optimistically
    if (voteStatus === type) {
      setVoteStatus(0);
      setVoteCount(voteCount - type);
    } else {
      setVoteCount(voteCount + type - voteStatus);
      setVoteStatus(type);
    }

    // Retrieve token
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.error("No auth token found—cannot submit vote.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id: post.id,
          vote_type: type,
        }),
      });

      if (!res.ok) throw new Error(`Vote failed: ${res.status}`);

      const data = await res.json();
      console.log("Vote response:", data);
    } catch (err) {
      console.error("Error submitting vote:", err.message);
      // Optionally, roll back optimistic update here
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleVote(1)}
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
        onClick={() => handleVote(-1)}
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
