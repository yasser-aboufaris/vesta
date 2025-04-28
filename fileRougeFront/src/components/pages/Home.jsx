import React, { useState } from "react";
import Nav from '../nav.jsx';
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
      <Nav setState={setState} />
      <div>
        <h1>Home Page</h1>
        <p>State value: {state}</p>
      </div>
      {state === 1 && (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
          <LoginForm onClose={handleCloseLogin} />
        </div>
      )}
      {state === 2 && (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
          <SignUpFormClient onClose={handleCloseLogin} />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Home;
