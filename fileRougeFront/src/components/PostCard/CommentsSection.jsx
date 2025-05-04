import React, { useState } from "react";

const CommentsSection = ({ post, isOpen, onClose }) => {
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  if (!isOpen) return null;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, post_id: post.id }),
      });
      if (!res.ok) throw new Error("Failed to post comment");

      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setNewComment("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-2xl border-2 border-green-300">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Comments</h3>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-green-50 p-3 rounded-md flex justify-between"
            >
              <p className="text-sm text-green-900">{c.content}</p>
              {c.owner_id === parseInt(localStorage.getItem("user_id")) && (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 text-xs ml-2 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment…"
            className="w-full p-3 border border-green-300 rounded-lg mb-2"
            rows="3"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-red-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-green-500 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;
