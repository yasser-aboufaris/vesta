import React from 'react';
import { useState } from 'react';
import { ChevronUp, ChevronDown, MessageSquare, Flag } from "lucide-react";

const PostCard = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState(""); 
  const [comments, setComments] = useState(post.comments); 
  const [showFull, setShowFull] = useState(false);


  const handleLike = () => {
    console.log("Liked!");
  };

  const handleReport = () => {
    console.log("Reported!");
  }

  const handleDislike = () => {
    console.log("Disliked!");
  };

  const handleCommentClick = () => {
    setIsCommenting(!isCommenting); 
  };

  const handleClosingComments = () =>{
    setIsCommenting(false);
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value); 
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        user: "Current User",
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white dark:bg-white rounded-lg shadow-md overflow-hidden border border-green-200 dark:border-green-300 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-700 mb-3">
          {post.title}
        </h2>

        {/* Content */}
        <div>
          <p className="text-gray-700 dark:text-gray-700">
            {showFull ? post.content : post.content.slice(0, 150) + (post.content.length > 150 ? "..." : "")}
          </p>

          {!showFull && post.content.length > 150 && (
            <button
              onClick={() => setShowFull(true)}
              className="mt-2 px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 transition"
            >
              Read More
            </button>
          )}
        </div>
        
        {/* Action Bar */}
        <div className="flex items-center justify-between mt-4">
          {/* Voting Section */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className="text-gray-400 hover:text-green-500 transition-colors duration-150"
            >
              <ChevronUp size={20} />
            </button>
            <span className="text-sm font-medium text-green-700 dark:text-green-700">
              {post.vote_count}
            </span>
            <button
              onClick={handleDislike}
              className="text-gray-400 hover:text-green-500 transition-colors duration-150"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="flex space-x-4 text-gray-500 dark:text-gray-500">
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-1 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-100 px-2 py-1 rounded transition-colors duration-150"
            >
              <MessageSquare size={16} />
              <span className="text-sm">Comment</span>
            </button>
            <button
              onClick={handleReport}
              className="flex items-center gap-1 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-100 px-2 py-1 rounded transition-colors duration-150"
            >
              <Flag size={16} />
              <span className="text-sm">Report</span>
            </button>
          </div>
        </div>
      </div>

      {isCommenting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-white rounded-lg p-6 w-3/4 max-w-2xl">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-700 mb-4">Comments</h3>
            
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-800">{comment.text}</p>
                  <small className="text-green-600 dark:text-green-600">{comment.user}</small>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Write your comment here..."
                className="w-full p-3 border border-green-200 dark:border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 dark:bg-white dark:text-gray-800 mb-4"
                rows="4"
              ></textarea>
              <div className='flex justify-between'>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150"
                >
                  Submit Comment
                </button>
                <button
                  onClick={handleClosingComments}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;