import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const MealsTable = ({ onDeleteMeal }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/meal')
      .then(res => setMeals(res.data))
      .catch(err => console.error('Error fetching meals:', err));
  }, []);

  const handleDelete = (id) => {
    onDeleteMeal(id);
    setMeals(meals.filter(meal => meal.id !== id));
  };

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
            {meals.map(meal => (
              <tr key={meal.id} className="hover:bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meal.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meal.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meal.calories_per_100g}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900 flex items-center" onClick={() => handleDelete(meal.id)}>
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealsTable;
