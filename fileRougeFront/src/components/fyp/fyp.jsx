/*  src/pages/Fyp.jsx  */
import React from "react";
import Nav from "../nav";          // adjust the paths if yours differ
import Sidebar from "./sideBar";
import Feed from "./PostCard/feed";
import Footer from "../footer";

/**
 * Page‑level component that assembles:
 *   • Top Nav
 *   • Left Sidebar
 *   • Main Feed
 *   • Footer
 * Uses a tall flex column so the footer stays at the bottom even on short pages.
 */
const Fyp = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      <Nav />

      {/* <div className="flex flex-1">
        <Sidebar /> */}

        <main className="flex-1 px-6 py-10 overflow-x-hidden">
          <Feed />
        </main>
      {/* </div> */}

      <Footer />
    </div>
  );
};

export default Fyp;
