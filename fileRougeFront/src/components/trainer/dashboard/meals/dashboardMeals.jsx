import { useState, useEffect } from 'react';
import { 
  Home, 
  FileText, 
  Calendar, 
  Utensils, 
  Dumbbell, 
  Menu, 
  X,
  Plus,
  Trash2
} from 'lucide-react';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// MealsTable Component
const MealsTable = ({ meals, onDeleteMeal }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Calories per 100g</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meals.map((meal) => (
              <tr key={meal.id} className="hover:bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meal.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meal.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meal.calories_per_100g}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-red-600 hover:text-red-900 flex items-center"
                    onClick={() => onDeleteMeal(meal.id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {meals.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No meals found. Add a new meal to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add Meal Form Component
const AddMealForm = ({ isOpen, onClose, onAddMeal }) => {
  const [name, setName] = useState('');
  const [caloriesPer100g, setCaloriesPer100g] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    
    if (!name || !caloriesPer100g) {
      setError('All fields are required');
      return;
    }
    
    try {
      setLoading(true);
      await onAddMeal({
        name,
        calories_per_100g: parseFloat(caloriesPer100g)
      });
      setName('');
      setCaloriesPer100g('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add meal');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Add New Meal</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div>
          <div className="mb-4">
            <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="name-input">
              Meal Name
            </label>
            <input
              className="shadow appearance-none border border-green-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              id="name-input"
              type="text"
              placeholder="E.g., Chicken Breast"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="calories-input">
              Calories per 100g
            </label>
            <input
              className="shadow appearance-none border border-green-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              id="calories-input"
              type="number"
              min="0"
              step="1"
              placeholder="E.g., 165"
              value={caloriesPer100g}
              onChange={(e) => setCaloriesPer100g(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-end">
            <button
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Meals Statistics Component
const MealsStatistics = ({ meals }) => {
  // Calculate statistics
  const totalMeals = meals.length;
  const averageCalories = meals.length 
    ? Math.round(meals.reduce((sum, meal) => sum + parseFloat(meal.calories_per_100g), 0) / meals.length) 
    : 0;
  const highestCalorieMeal = meals.length 
    ? meals.reduce((prev, current) => 
        parseFloat(prev.calories_per_100g) > parseFloat(current.calories_per_100g) ? prev : current, meals[0])
    : { name: 'None', calories_per_100g: 0 };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-green-800">Meal Statistics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">Total Meals</p>
            <p className="text-3xl font-bold">{totalMeals}</p>
            <p className="text-sm text-gray-500">In Database</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">Avg. Calories</p>
            <p className="text-3xl font-bold">{averageCalories}</p>
            <p className="text-sm text-gray-500">Per 100g</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">Highest Calorie</p>
            <p className="text-2xl font-bold truncate" title={highestCalorieMeal.name}>
              {highestCalorieMeal.name || 'None'}
            </p>
            <p className="text-sm text-gray-500">
              {highestCalorieMeal.name ? `${highestCalorieMeal.calories_per_100g} cal/100g` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardMeal = () => {
  const [activeTab, setActiveTab] = useState('meals');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch meals on component mount
  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/meals`);
      setMeals(response.data);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError('Failed to load meals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async (mealData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/meals`, mealData);
      
      if (response.status === 201 || response.status === 200) {
        // Refresh the meals list to get the latest data with server-assigned ID
        await fetchMeals();
        return response.data;
      } else {
        throw new Error('Failed to add meal');
      }
    } catch (err) {
      console.error('Error adding meal:', err);
      if (err.response) {
        if (err.response.status === 409) {
          throw new Error('Meal already exists');
        } else if (err.response.data && err.response.data.detail) {
          throw new Error(err.response.data.detail);
        }
      }
      throw new Error('Failed to add meal. Please try again.');
    }
  };

  const handleDeleteMeal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;
  
    try {
    //   const token = localStorage.getItem('token');
    //   if (!token) throw new Error('No auth token found');
        const token = 	'3|YnUSRzvlg6pn4l9aZ8FpVWJgKEqZ9w8BB5wMc186777d44e4';
      const response = await axios.delete(`${API_BASE_URL}/meal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
  
      if (response.status === 204 || response.status === 200) {
        setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
      } else {
        throw new Error('Failed to delete meal');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete meal. Please try again.');
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed z-20 top-4 left-4 bg-white p-2 rounded-md shadow"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static w-64 h-full bg-white shadow-lg transition-all z-10
        ${sidebarOpen ? 'left-0' : '-left-64'}
      `}>
        <div className="p-4 bg-green-600 text-white">
          <h1 className="text-xl font-bold">Nutrition Dashboard</h1>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <button 
                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === 'home' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('home')}
              >
                <Home className="mr-3" size={20} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === 'posts' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('posts')}
              >
                <FileText className="mr-3" size={20} />
                <span>Posts</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === 'programs' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('programs')}
              >
                <Calendar className="mr-3" size={20} />
                <span>Programs</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === 'meals' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('meals')}
              >
                <Utensils className="mr-3" size={20} />
                <span>Meals</span>
              </button>
            </li>
            <li>
              <button 
                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === 'exercises' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('exercises')}
              >
                <Dumbbell className="mr-3" size={20} />
                <span>Exercises</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'meals' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-green-800">Meals Database</h1>
              <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={18} className="mr-1" />
                Add New Meal
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
                <button 
                  className="ml-4 underline text-red-700"
                  onClick={fetchMeals}
                >
                  Try Again
                </button>
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-green-500 border-r-transparent align-middle"></div>
                <p className="mt-2 text-gray-600">Loading meals...</p>
              </div>
            ) : (
              <>
                <MealsStatistics meals={meals} />
                <MealsTable meals={meals} onDeleteMeal={handleDeleteMeal} />
              </>
            )}
            
            <AddMealForm 
              isOpen={showAddForm} 
              onClose={() => setShowAddForm(false)}
              onAddMeal={handleAddMeal}
            />
          </>
        )}
        
        {activeTab !== 'meals' && (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold text-green-800 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h2>
            <p className="text-gray-600">
              This section is currently under development. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMeal;