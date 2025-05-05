import React, { useState } from "react";
import Nav from '../nav.jsx';
import PostForm from "../forms/PostingForm.jsx";
import Feed from "../fyp/PostCard/feed.jsx";
import LoginForm from "../forms/LoginForm.jsx";
import SignUpFormClient from "../forms/SignUpClient.jsx";
import Footer from '../footer.jsx';
const Home = () => {
  const [state, setState] = useState(0);
  const handleCloseLogin = () => {
    setState(0);
  };
  return (
    <div>
      <Nav />
      <div className="flex">
        <div className="w-1/3 sticky top-0 self-start">
          <PostForm />
        </div>
        <div className="w-2/3 border-l border-gray-700 pl-4"> 
        <Feed  />
        </div>

      </div>
      <div>
      </div>

      <Footer />
    </div>
  );
};
export default Home;
