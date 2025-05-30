import React, { useState } from "react";

export default function CreatePostBar() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center mt-10">
      <h1 className="text-xl font-bold">Posting</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded border-2 border-gray-600 hover:border-red-600 transition-colors"
      >
        Create Post
      </button>

      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-md">
      <h2 className="text-lg mb-4">New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // handle form submit
        }}
      >
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          rows={4}
        />

        <div className="mb-4 text-white">
          <label className="block mb-2">Tags:</label>
          <div className="flex gap-4">
            <label>
              <input type="checkbox" name="tags" value="fun" /> Fun
            </label>
            <label>
              <input type="checkbox" name="tags" value="sport" /> Sport
            </label>
            <label>
              <input type="checkbox" name="tags" value="news" /> News
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
