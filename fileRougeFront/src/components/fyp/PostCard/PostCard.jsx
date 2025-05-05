import React, { useState } from "react";
import { MessageSquare, Flag, Edit2, Trash2 } from "lucide-react";
import VoteSection from "./VoteSection";
import CommentsSection from "./CommentsSection";

const PostCard = ({ post, userVote , setRefreshKey , refreshKey}) => {

  const [showFull, setShowFull] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.warn("No valid user in localStorage", err);
  }
  const currentUserId = currentUser?.id;

  const authorId = post.user_id ?? post.owner?.id;

  const handleDelete = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.error("No auth token found — can’t delete post.");
      return;
    }
  
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/post/${post.id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      if (res.status === 204) {
        console.log("Post deleted successfully (204).");
        setRefreshKey(refreshKey + 1);
        console.log(refreshKey);        
      } else {
        console.error("Delete failed with status:", res.status);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  };
  

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

        {post.tags?.length > 0 && (
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

      <div className="flex items-center justify-between px-4 py-2 bg-green-50">
        <VoteSection post={post} userVote={userVote} />

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCommenting(true)}
            className="flex items-center gap-1 text-gray-500 hover:text-green-600"
          >
            <MessageSquare size={16} />
            <span className="text-sm">Comment</span>
          </button>


          {currentUserId === authorId && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-600"
              >

                <Trash2 size={16} />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          )}
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
