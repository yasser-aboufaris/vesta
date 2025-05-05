import React, { useState, useEffect } from "react";
import axios from "axios";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/tags");
        setTagOptions(response.data.map(tag => ({ id: tag.id, name: tag.name })));
        setError(null);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError("Failed to load tags. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);
      const postData = { title, content, tags: selectedTags };
      
      await axios.post("http://127.0.0.1:8000/api/post", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
        }
      });

      setTitle("");
      setContent("");
      setSelectedTags([]);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);

    } catch (err) {
      console.error("Error submitting post:", err);
      setError("Failed to submit post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-green-200 text-sm">
        <div className="p-4">
          <h2 className="text-lg font-bold text-green-700 mb-3 text-center">New Post</h2>

          {submitSuccess && (
            <div className="mb-2 p-2 bg-green-100 border border-green-300 text-green-800 rounded">
              Submitted!
            </div>
          )}

          {error && !isLoading && (
            <div className="mb-2 p-2 bg-red-100 border border-red-300 text-red-800 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="title" className="block text-green-800 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white text-green-900 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Post title"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-green-800 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded bg-white text-green-900 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                placeholder="Post content"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-green-800 mb-1">Tags</label>
              {isLoading ? (
                <div className="text-center text-green-600">Loading tags...</div>
              ) : (
                <div className="max-h-28 overflow-y-auto border rounded bg-white p-1 border-green-200">
                  <div className="flex flex-wrap gap-1">
                    {tagOptions.map(tag => (
                      <div
                        key={tag.id}
                        className={`
                          px-2 py-1 rounded text-xs font-medium cursor-pointer transition
                          ${selectedTags.includes(tag.id)
                            ? 'bg-green-700 text-white'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'}
                          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        onClick={() => !isSubmitting && handleTagToggle(tag.id)}
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className={`
                  w-full font-semibold py-2 px-3 rounded transition
                  ${isSubmitting
                    ? 'bg-green-300 cursor-not-allowed text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'}
                `}
                disabled={isLoading || isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
