import React from "react";
import { useState } from "react";
import Nav from "../nav";
import Footer from "../footer";
import Feed from "../feed";

function Fyp() {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen">
      <Nav />
      <Feed />
      <Footer />
    </div>
  );
}       