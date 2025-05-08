import React, { useState } from "react";
import { PlusCircle, Flame, Star, Menu, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PostForm from "./postingForm";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Define a `to` for route items, `action` for the modal
  const navItems = [
    { icon: Compass, label: "FYP", to: "/fyp" },
    { icon: Flame, label: "Tendance", to: "/tendance" },
    { icon: Star, label: "Favorites", to: "/favorites" },
    {
      icon: PlusCircle,
      label: "Create Post",
      action: () => setShowPostModal(true),
    },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 md:hidden bg-green-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-green-200 w-56 z-10 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="py-6 px-4 border-b border-green-100 flex items-center justify-center">
          <a
            href="#"
            className="text-2xl font-extrabold flex items-center hover:text-green-600 transition duration-300"
          >
            <span className="mr-1">Vesta</span>
            <span className="text-green-600">Fit</span>
          </a>
        </div>

        <nav className="mt-4">
          <ul>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx}>
                  <button
                    onClick={() => {
                      // If it's a route, navigate; otherwise run item.action()
                      if (item.to) navigate(item.to);
                      else item.action();
                      setIsOpen(false);
                    }}
                    className="w-full text-left flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    <Icon size={18} className="mr-3" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {showPostModal && <PostForm onClose={() => setShowPostModal(false)} />}
    </>
  );
};

export default Sidebar;
