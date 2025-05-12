import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Dumbbell, Utensils } from "lucide-react";

export default function ProgramViewer() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/programs");
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-green-800 font-medium flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          Loading programs...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {selectedProgram ? (
          <ProgramDetails
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
          />
        ) : (
          <ProgramList
            programs={programs}
            onSelectProgram={setSelectedProgram}
          />
        )}
      </div>
    </div>
  );
}

// Program List Component
function ProgramList({ programs, onSelectProgram }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-green-800 flex items-center">
        <Dumbbell className="mr-2" size={28} />
        Fitness Programs
      </h1>
      
      {programs.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">No programs available</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {programs.map(program => (
            <div 
              key={program.id}
              className="bg-white p-5 rounded-lg shadow cursor-pointer hover:shadow-md transition-all border-l-4 border-green-500 hover:border-green-600"
              onClick={() => onSelectProgram(program)}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-green-800">{program.name}</h2>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {program.days.length} days
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2 flex items-center">
                <Calendar size={14} className="mr-1" />
                Created: {new Date(program.created_at).toLocaleDateString()}
              </p>
              <p className="mt-3 text-gray-700">
                {program.description || "Start your fitness journey with this program"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Program Details Component
function ProgramDetails({ program, onBack }) {
  // Calculate calories for a day
  const calculateDayCalories = (day) => {
    return day.meals.reduce((total, meal) => {
      return total + (meal.calories_per_100g * meal.pivot.grams / 100);
    }, 0);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-green-800">{program.name}</h1>
      </div>
      
      <div className="space-y-6">
        {program.days.map(day => (
          <div key={day.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-green-800 border-b border-green-100 pb-2">
              Day {day.day_number}
            </h2>
            
            {/* Meals Section */}
            <div className="mb-6">
              <h3 className="font-medium text-green-700 mb-3 flex items-center">
                <Utensils size={18} className="mr-2" /> 
                Meals
              </h3>
              {day.meals.length === 0 ? (
                <p className="text-gray-500 italic">No meals for this day</p>
              ) : (
                <div className="bg-green-50 p-4 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-green-800">
                        <th className="pb-3">Food</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.meals.map(meal => (
                        <tr key={meal.id} className="border-t border-green-100">
                          <td className="py-2 font-medium">{meal.name}</td>
                          <td className="py-2">{meal.pivot.grams}g</td>
                          <td className="py-2">
                            {Math.round(meal.calories_per_100g * meal.pivot.grams / 100)} cal
                          </td>
                        </tr>
                      ))}
                      <tr className="font-medium border-t border-green-200 text-green-800">
                        <td className="pt-3" colSpan="2">Total:</td>
                        <td className="pt-3">{Math.round(calculateDayCalories(day))} cal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Exercises Section */}
            <div>
              <h3 className="font-medium text-green-700 mb-3 flex items-center">
                <Dumbbell size={18} className="mr-2" />
                Exercises
              </h3>
              {day.exercises.length === 0 ? (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-green-700 italic">Rest day</p>
                </div>
              ) : (
                <div className="bg-green-50 p-4 rounded-lg">
                  <ul className="divide-y divide-green-200">
                    {day.exercises.map(exercise => (
                      <li key={exercise.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="font-medium text-green-800">{exercise.name}</div>
                        <div className="text-sm text-green-700 mt-1">
                          {exercise.pivot.repetitions} repetitions
                        </div>
                        {exercise.description && (
                          <div className="text-sm text-gray-600 mt-2 bg-green-100 p-2 rounded">
                            {exercise.description}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}