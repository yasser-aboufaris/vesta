// ParentComponent.jsx
import React, { useState } from "react";
import LoginForm from "./LoginForm"; // Import the LoginForm component

const ParentComponent = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const handleOpenLoginForm = () => {
    setIsLoginFormVisible(true); // Show the login form
  };

  const handleCloseLoginForm = () => {
    setIsLoginFormVisible(false); // Hide the login form
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Your existing login button */}
      <button
        onClick={handleOpenLoginForm}
        className="bg-black text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Login
      </button>

      {/* Conditionally render the LoginForm */}
      {isLoginFormVisible && <LoginForm onClose={handleCloseLoginForm} />}
    </div>
  );
};

export default ParentComponent;
