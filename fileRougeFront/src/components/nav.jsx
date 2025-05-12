import React, { useState } from 'react';

export default function Navbar() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    bodyFat: '',
    sex: 'male',
    activity: '1.2',
    goalWeight: '',
    timeframe: '4',
    calculationType: 'maintenance'
  });
  const [calories, setCalories] = useState(null);
  const [goalCalories, setGoalCalories] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    setCalories(null);
    setGoalCalories(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateCalories = (e) => {
    if (e) e.preventDefault();
    const { age, weight, height, bodyFat, sex, activity, goalWeight, timeframe, calculationType } = form;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const bf = parseFloat(bodyFat);
    const act = parseFloat(activity);
    const gw = parseFloat(goalWeight);
    const tf = parseFloat(timeframe);

    if (isNaN(w) || isNaN(h) || isNaN(a) || isNaN(act) || (calculationType === 'goal' && (isNaN(gw) || isNaN(tf)))) {
      return;
    }

    let bmr = isNaN(bf)
      ? (sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161)
      : 370 + 21.6 * w * (1 - bf / 100);

    const maintenanceCalories = Math.round(bmr * act);
    setCalories(maintenanceCalories);

    if (calculationType === 'goal' && !isNaN(gw) && !isNaN(tf) && tf > 0) {
      const weightDiff = gw - w;
      const totalCalorieDiff = weightDiff * 7700;
      const dailyCalorieAdjustment = totalCalorieDiff / (tf * 7);
      const calculatedGoalCalories = Math.round(maintenanceCalories + dailyCalorieAdjustment);
      const calorieFloor = sex === 'female' ? 1200 : 1500;
      setGoalCalories(Math.max(calculatedGoalCalories, calorieFloor));
    } else {
      setGoalCalories(null);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative">
      <nav className="absolute top-0 left-0 w-full z-[9999] bg-white shadow-lg border-b border-green-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <a href="#" className="flex items-center py-5 px-2 text-green-700 font-bold text-xl">
                  FitLife
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1 text-green-700">
                <a href="#" className="py-5 px-3 hover:text-green-500">Home</a>
                <a href="#" className="py-5 px-3 hover:text-green-500">Workouts</a>
                <a href="#" className="py-5 px-3 hover:text-green-500">Nutrition</a>
                <a href="#" className="py-5 px-3 hover:text-green-500">About</a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleCalculator}
                className="text-sm bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
              >
                Calorie Calculator
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
                <svg className="h-6 w-6 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <a href="/fyp" className="block py-2 px-4 text-green-700 hover:bg-green-100">Home</a>
          <a href="#" className="block py-2 px-4 text-green-700 hover:bg-green-100">Workouts</a>
          <a href="#" className="block py-2 px-4 text-green-700 hover:bg-green-100">Nutrition</a>
          <a href="#" className="block py-2 px-4 text-green-700 hover:bg-green-100">About</a>
          <div className="py-2 px-4">
            <button
              onClick={toggleCalculator}
              className="text-sm bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded w-full mb-2"
            >
              Calorie Calculator
            </button>
          </div>
        </div>
      </nav>

      {showCalculator && (
        <div className="fixed top-0 left-0 w-full h-screen z-[9998] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={toggleCalculator}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4 text-center text-green-700">Calorie Calculator</h2>

            <div className="mb-4">
              <div className="flex rounded-md overflow-hidden border">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, calculationType: 'maintenance' })}
                  className={`flex-1 py-2 ${form.calculationType === 'maintenance' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                >
                  Maintenance
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, calculationType: 'goal' })}
                  className={`flex-1 py-2 ${form.calculationType === 'goal' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                >
                  Goal Weight
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 rounded" />
                <select name="sex" value={form.sex} onChange={handleChange} className="border p-2 rounded bg-white">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" className="border p-2 rounded" />
                <input type="number" name="height" value={form.height} onChange={handleChange} placeholder="Height (cm)" className="border p-2 rounded" />
              </div>
              <input type="number" name="bodyFat" value={form.bodyFat} onChange={handleChange} placeholder="Body Fat % (optional)" className="w-full border p-2 rounded" />
              <select name="activity" value={form.activity} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="1.2">Sedentary</option>
                <option value="1.375">Lightly active</option>
                <option value="1.55">Moderately active</option>
                <option value="1.725">Very active</option>
                <option value="1.9">Super active</option>
              </select>

              {form.calculationType === 'goal' && (
                <div className="space-y-3">
                  <input type="number" name="goalWeight" value={form.goalWeight} onChange={handleChange} placeholder="Goal Weight (kg)" className="w-full border p-2 rounded" />
                  <div className="flex items-center">
                    <label className="mr-2 text-sm">Timeframe:</label>
                    <select name="timeframe" value={form.timeframe} onChange={handleChange} className="flex-1 border p-2 rounded bg-white">
                      <option value="4">4 weeks</option>
                      <option value="8">8 weeks</option>
                      <option value="12">12 weeks</option>
                      <option value="16">16 weeks</option>
                      <option value="24">24 weeks</option>
                    </select>
                  </div>
                </div>
              )}

              <button onClick={calculateCalories} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full">
                Calculate
              </button>
            </div>

            {calories !== null && (
              <div className="mt-4 text-center">
                <p className="font-medium text-green-700">Maintenance Calories:</p>
                <p className="text-2xl font-bold text-green-600">{calories} kcal</p>
                {goalCalories !== null && (
                  <div className="mt-2">
                    <p className="font-medium text-green-700">Goal Calories:</p>
                    <p className="text-2xl font-bold text-blue-600">{goalCalories} kcal</p>
                    <p className="text-sm mt-1">
                      {goalCalories > calories
                        ? `Surplus of ${goalCalories - calories} kcal/day`
                        : `Deficit of ${calories - goalCalories} kcal/day`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
