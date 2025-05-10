import { useState, useEffect } from 'react';
import { 
  Plus
} from 'lucide-react';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// MealsTable Component
import MealsTable from './MealsTable';

// Add Meal Form Component
import AddMealModal from './AddMealModal';

// Meals Statistics Component
import MealsStatistics from './MealsStatistics';

// Main Meals Dashboard Component
const MealsDashboard = () => {
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
      const token = '3|YnUSRzvlg6pn4l9aZ8FpVWJgKEqZ9w8BB5wMc186777d44e4';
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

  return (
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
      
      <AddMealModal
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)}
        onAddMeal={handleAddMeal}
      />
    </>
  );
};

export default MealsDashboard;