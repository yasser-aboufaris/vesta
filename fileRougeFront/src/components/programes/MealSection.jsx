import { useState, useEffect } from 'react';

export default function MealSection({ meals, addMeal, removeMeal }) {
  const [meal, setMeal] = useState({ name: '', grams: '' });
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/meals');
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setAvailableMeals(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching meals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleAdd = () => {
    addMeal(meal.name, meal.grams);
    setMeal({ name: '', grams: '' });
  };

  return (
    <div className="p-4 bg-green-50 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-green-800">Add Meal</h2>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-green-700">Meal Name</label>
          {isLoading ? (
            <p className="text-sm italic text-green-600">Loading meals...</p>
          ) : error ? (
            <p className="text-sm italic text-red-600">Error: {error}</p>
          ) : (
            <select
              value={meal.name}
              onChange={(e) => setMeal({ ...meal, name: e.target.value })}
              className="w-full border border-green-300 rounded p-2 bg-white focus:outline-none focus:ring focus:ring-green-200"
            >
              <option value="">Select a meal</option>
              {availableMeals.map((m, index) => (
                <option key={index} value={m.name}>{m.name}</option>
              ))}
            </select>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-green-700">Grams</label>
          <input
            type="number"
            value={meal.grams}
            onChange={(e) => setMeal({ ...meal, grams: e.target.value })}
            className="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Enter grams"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!meal.name.trim() || !meal.grams}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-6 disabled:bg-gray-300 focus:outline-none focus:ring focus:ring-green-200"
        >
          Add
        </button>
      </div>
      <MealList meals={meals} removeMeal={removeMeal} />
    </div>
  );
}

function MealList({ meals, removeMeal }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2 text-sm text-green-700">Current Meals</h3>
      {meals.length === 0 ? (
        <p className="text-green-500 text-sm italic">No meals added yet</p>
      ) : (
        <ul className="space-y-2">
          {meals.map((meal, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-2 rounded border border-green-200 text-sm">
              <div>
                <span className="font-medium text-green-800">{meal.name}</span>
                <span className="ml-2 text-green-600">({meal.grams}g)</span>
              </div>
              <button
                onClick={() => removeMeal(index)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}