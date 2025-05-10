import React from 'react';
import { Home, FileText, Calendar, Utensils, Dumbbell } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen }) => (
  <div className={`fixed md:static w-64 h-full bg-white shadow-lg transition-all z-10 ${sidebarOpen ? 'left-0' : '-left-64'}`}>
    <div className="p-4 bg-green-600 text-white">
      <h1 className="text-xl font-bold">Nutrition Dashboard</h1>
    </div>
    <nav className="p-2">
      <ul className="space-y-1">
        {[
          { key: 'home', icon: <Home size={20} />, label: 'Home' },
          { key: 'posts', icon: <FileText size={20} />, label: 'Posts' },
          { key: 'programs', icon: <Calendar size={20} />, label: 'Programs' },
          { key: 'meals', icon: <Utensils size={20} />, label: 'Meals' },
          { key: 'exercises', icon: <Dumbbell size={20} />, label: 'Exercises' },
        ].map(item => (
          <li key={item.key}>
            <button
              className={`flex items-center w-full p-3 rounded-md text-left bg-green-100 text-green-600`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default Sidebar;