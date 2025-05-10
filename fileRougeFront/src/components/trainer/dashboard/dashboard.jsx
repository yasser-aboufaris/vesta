import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Import components
import Sidebar from './comp/sideBar';
import MealsDashboard from './meals/dashboardMeals';
import ExercisesDashboard from './exercises/ExercisesDashboard';

// Placeholder components for other tabs
const Home = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Nutrition Dashboard</h1>
    <p className="text-gray-600">Select an option from the sidebar to get started.</p>
  </div>
);

const Posts = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Posts</h1>
    <p className="text-gray-600">Posts management coming soon.</p>
  </div>
);

const Programs = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Programs</h1>
    <p className="text-gray-600">Programs management coming soon.</p>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to render the active dashboard
  const renderDashboard = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'posts':
        return <Posts />;
      case 'programs':
        return <Programs />;
      case 'meals':
        return <MealsDashboard />;
      case 'exercises':
        return <ExercisesDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center md:hidden">
        <h1 className="text-lg font-semibold text-green-600">Nutrition Dashboard</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            // Close sidebar on mobile after selection
            if (window.innerWidth < 768) {
              setSidebarOpen(false);
            }
          }} 
          sidebarOpen={sidebarOpen} 
        />
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default App;