import React from "react";
import Button from './buttons/LoginCaller';
import ClientSignCButton from './buttons/ClientSignUp';

const Nav = ({ setState }) => {
  return (
    <nav className="fixed top-0 bt-6 flex items-center w-[100%] justify-between bg-black text-white p-5 shadow-lg">
      <div className="text-2xl font-extrabold tracking-wider">
        <a href="#" className="hover:text-red-600 flex items-center">
          <span className="mr-1">Vesta</span><span className="text-red-800">Fit</span>
        </a>
      </div>
      <ul className="flex space-x-10 text-lg font-medium">
        <li>
          <a href="#"
            className="hover:text-red-900 transition-all duration-300 hover:border-b-2 hover:border-red-400 pb-1">Home</a>
        </li>
        <li>
          <a href="#"
            className="hover:text-yellow-400 transition-all duration-300 hover:border-b-2 hover:border-red-400 pb-1">About</a>
        </li>
        <li>
          <a href="#"
            className="hover:text-yellow-400 transition-all duration-300 hover:border-b-2 hover:border-yellow-400 pb-1">Services</a>
        </li>
        <li>
          <a href="#"
            className="hover:text-yellow-400 transition-all duration-300 hover:border-b-2 hover:border-yellow-400 pb-1">Contact</a>
        </li>
      </ul>

      <div>
        <Button setState={setState} />
        <ClientSignCButton setState={setState} />
      </div>
    </nav>
  );
};
export default Nav;