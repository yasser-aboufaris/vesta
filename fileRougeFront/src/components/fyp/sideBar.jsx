import React, { useState } from "react";
import { PlusCircle, Flame, Star, Menu, Compass } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: Compass, label: "FYP" },
    { icon: Flame, label: "Tendance" },
    { icon: Star, label: "Favorites" },
    { icon: PlusCircle, label: "Create Post" },
  ];

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 md:hidden bg-green-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      <div 
        className={`fixed top-0 left-0 h-full bg-white border-r border-green-200 w-56 z-10 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-green-100">
          <h1 className="text-xl font-bold text-green-700">GreenForum</h1>
        </div>

        <nav className="mt-4">
          <ul>
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <li key={index}>
                  <button
                    className="w-full text-left flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                    onClick={() => setIsOpen(false)} // Just closes sidebar
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
    </>
  );
};

export default Sidebar;
