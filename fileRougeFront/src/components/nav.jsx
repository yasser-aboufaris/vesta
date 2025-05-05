import React, { useState } from "react";
import { Menu } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="top-0 py-4 px-6 flex items-center w-full justify-between bg-gray-50 text-green-900 shadow-md relative z-50">
      <div className="text-2xl font-extrabold tracking-wider">
        <a href="#" className="flex items-center hover:text-green-600 transition duration-300">
          <span className="mr-1">Vesta</span>
          <span className="text-green-600">Fit</span>
        </a>
      </div>

      <ul className="hidden md:flex space-x-10 text-lg font-medium">
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

      <button className="md:hidden" onClick={toggleMenu}>
        <Menu size={28} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-green-200 shadow-md md:hidden">
          <ul className="flex flex-col space-y-2 p-4 text-lg font-medium">
            <li>
              <a
                href="#"
                className="block hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
