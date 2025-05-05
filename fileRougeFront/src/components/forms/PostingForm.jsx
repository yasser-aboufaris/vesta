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

  // Fetch tags from the backend API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/tags");
        const tags = response.data.map(tag => ({ id: tag.id, name: tag.name }));
        setTagOptions(tags);
        setError(null);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError("Failed to load tags. Please try again later.");
        setTagOptions([{ id: 1, name: "Technology" }, { id: 2, name: "Design" }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const postData = {
        title,
        content,
        tags: selectedTags // Sending tag IDs here
      };
      console.log("Post data:", postData);
      await axios.post("http://127.0.0.1:8000/api/post", postData, {
        headers: { "Content-Type": "application/json" }
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
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Create New Post</h2>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-gray-300 border border-gray-400 text-black rounded-lg">
              Post submitted successfully!
            </div>
          )}

          {error && !isLoading && (
            <div className="mb-4 p-3 bg-gray-300 border border-gray-500 text-black rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
                placeholder="Enter post title"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-800 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-300 text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
                rows="6"
                placeholder="Write your post content"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Tags
              </label>
              
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-pulse text-gray-700">Loading tags...</div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <div 
                      key={tag.id} 
                      className={`
                        px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition duration-200
                        ${selectedTags.includes(tag.id) 
                          ? 'bg-black text-white' 
                          : 'bg-gray-400 text-black hover:bg-gray-500'}
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      onClick={() => !isSubmitting && handleTagToggle(tag.id)}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className={`
                  w-full font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                  ${isSubmitting 
                    ? 'bg-gray-500 cursor-not-allowed text-white' 
                    : 'bg-black hover:bg-gray-900 text-white'}
                `}
                disabled={isLoading || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;