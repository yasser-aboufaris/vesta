import React, { useState } from "react";

const PostCard = ({ post }) => {
  // State to handle the toggle of showing more/less content
  const [showFullContent, setShowFullContent] = useState(false);

  // Check if the content exceeds a certain length to decide if "Read more" is needed
  const contentLengthLimit = 150; // Set a character length limit for truncating content
  const isContentTooLong = post.content.length > contentLengthLimit;
  
  // Function to toggle between showing more or less content
  const toggleContent = () => {
    setShowFullContent((prevState) => !prevState);
  };

  return (
    <div className="post-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
      <h2 className="post-title text-lg font-bold text-gray-900 dark:text-white leading-snug">
        {post.title}
      </h2>

      <p className="post-content text-base text-red-800 dark:text-red-300 leading-relaxed">
        {/* Show full content if toggled, otherwise show truncated content */}
        {showFullContent
          ? post.content
          : `${post.content.slice(0, contentLengthLimit)}...`}
      </p>

      {/* Show "Read more" only if the content is long enough */}
      {isContentTooLong && (
        <button
          onClick={toggleContent}
          className="read-more text-blue-600 dark:text-blue-400 mt-2 focus:outline-none"
        >
          {showFullContent ? "Show less" : "Read more"}
        </button>
      )}

      {post.tags?.length > 0 && (
        <div className="post-tags flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700" style={{ maxWidth: "100%" , margin: "2rem auto"  }}>
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="post-tag bg-red-800 dark:bg-yellow-800 text-gray-600 dark:text-yellow-100 px-3 py-1 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
