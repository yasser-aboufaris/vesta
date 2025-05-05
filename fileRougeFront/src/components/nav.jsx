import React from "react";

const Nav = () => {
  return (
    <nav className="top-0 py-4 px-8 flex items-center w-full justify-between bg-gray-50 text-green-900 shadow-md">
      <div className="text-2xl font-extrabold tracking-wider">
        <a href="#" className="flex items-center hover:text-green-600 transition duration-300">
          <span className="mr-1">Vesta</span>
          <span className="text-green-600">Fit</span>
        </a>
      </div>

      <ul className="flex space-x-10 text-lg font-medium">
        <li>
          <a
            href="#"
            className="hover:text-green-600 hover:border-b-2 hover:border-green-400 pb-1 transition-all duration-200"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-600 hover:border-b-2 hover:border-green-400 pb-1 transition-all duration-200"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-600 hover:border-b-2 hover:border-green-400 pb-1 transition-all duration-200"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-green-600 hover:border-b-2 hover:border-green-400 pb-1 transition-all duration-200"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
