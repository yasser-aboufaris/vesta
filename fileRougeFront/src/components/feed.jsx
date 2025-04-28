import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; 

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading-text">Loading...</div>;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div style={{ backgroundColor: "black" }} >
             <div className="feed-container mt-24 w-full " style={{ maxWidth: "36rem", margin: "3rem auto" }}>
      </div>
      <div className="feed-container mt-24 w-full " style={{ maxWidth: "36rem", margin: "5rem auto" }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <style>
        {`
          .feed-container {
            max-width: 36rem; /* equivalent to max-w-xl */
            margin: 1rem auto 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .loading-text {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 1rem;
            color: #374151; /* optional neutral color */
          }

          .error-text {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 1rem;
            color: #ef4444; /* Tailwind red-500 */
          }
        `}
      </style>
    </div>
  );
};

export default Feed;
