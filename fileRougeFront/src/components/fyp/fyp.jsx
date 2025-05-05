/*  src/pages/Fyp.jsx  */
import React from "react";
import Nav from "../nav"; 
import Feed from "./PostCard/feed";
import Footer from "../footer";
import Sidebar from "./sideBar"; 


const Fyp = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      <Nav />

        <Sidebar />

        <main className="flex-1 px-6 py-10 overflow-x-hidden">
          <Feed />
        </main>
      {/* </div> */}

      <Footer />
    </div>
  );
};

export default Fyp;
