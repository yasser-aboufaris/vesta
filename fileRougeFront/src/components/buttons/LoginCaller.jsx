// Button.jsx
import React from "react";

const Button = ({ setState }) => {
  const handleClick = () => {
    setState(1); 
    console.log("State updated to:", 1)
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-2 rounded-full font-bold hover:bg-gray-300 hover:text-red-900 transition-all duration-300 shadow-md"
    >
      Sign in 
    </button>
  );
};

export default Button;
