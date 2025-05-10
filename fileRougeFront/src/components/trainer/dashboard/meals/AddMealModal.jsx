import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddMealModal = ({ isOpen, onClose, onAddMeal }) => {
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

export default AddMealModal;