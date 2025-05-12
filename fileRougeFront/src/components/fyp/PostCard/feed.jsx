import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      // grab token from storage
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Not authenticated — please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/posts", {

        });
        console.log("Fetched posts:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refreshKey]);

  if (loading)
    return (
      <div className="text-center mt-6 text-green-700 text-lg font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-6 text-red-500 text-lg font-medium">
        {error}
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id ?? post.uuid}
            post={post}
            userVote={post.user_vote}
            setRefreshKey={setRefreshKey}
            refreshKey={refreshKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
