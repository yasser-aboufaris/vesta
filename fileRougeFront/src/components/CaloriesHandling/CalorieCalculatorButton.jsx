import React, { useState } from 'react';

export default function CalorieCalculatorButton() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    bodyFat: '',
    sex: 'male',
    activity: '1.2',
  });
  const [calories, setCalories] = useState(null);

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    setCalories(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    const { age, weight, height, bodyFat, sex, activity } = form;
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age), bf = parseFloat(bodyFat), act = parseFloat(activity);
    let bmr = isNaN(bf)
      ? (sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161)
      : 370 + 21.6 * w * (1 - bf / 100);
    setCalories(Math.round(bmr * act));
  };

  return (
    <>
      <button
        onClick={toggleCalculator}
        className="text-sm bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
      >
        Calorie Calculator
      </button>

      {showCalculator && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              onClick={toggleCalculator}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">Calorie Calculator</h2>

            <form onSubmit={calculateCalories} className="space-y-3">
              <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="w-full border p-2 rounded" required />
              <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" className="w-full border p-2 rounded" required />
              <input type="number" name="height" value={form.height} onChange={handleChange} placeholder="Height (cm)" className="w-full border p-2 rounded" required />
              <input type="number" name="bodyFat" value={form.bodyFat} onChange={handleChange} placeholder="Body Fat % (optional)" className="w-full border p-2 rounded" />
              <select name="sex" value={form.sex} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select name="activity" value={form.activity} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                <option value="1.2">Sedentary</option>
                <option value="1.375">Lightly active</option>
                <option value="1.55">Moderately active</option>
                <option value="1.725">Very active</option>
                <option value="1.9">Super active</option>
              </select>
              <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded w-full">Calculate</button>
            </form>

            {calories !== null && (
              <div className="mt-4 text-center">
                <p className="font-medium">Estimated Calories:</p>
                <p className="text-2xl font-bold text-green-600">{calories} kcal</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
