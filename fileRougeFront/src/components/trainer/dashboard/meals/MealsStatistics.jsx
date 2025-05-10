import React from 'react';

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

export default MealsStatistics;