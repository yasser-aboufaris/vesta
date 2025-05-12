import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExerciseSection({ exercises, addExercise, removeExercise }) {
  const [exercise, setExercise] = useState({ name: '', reps: '' });
  const [availableExercises, setAvailableExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/exercises');
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setAvailableExercises(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching exercises:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleAdd = () => {
    addExercise(exercise.name, exercise.reps);
    setExercise({ name: '', reps: '' });
  };

  return (
    <div className="p-4 bg-green-50 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-green-800">Add Exercise</h2>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-green-700">Exercise Name</label>
          {isLoading ? (
            <p className="text-sm italic text-green-600">Loading exercises...</p>
          ) : error ? (
            <p className="text-sm italic text-red-600">Error: {error}</p>
          ) : (
            <select
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              className="w-full border border-green-300 rounded p-2 bg-white focus:outline-none focus:ring focus:ring-green-200"
            >
              <option value="">Select an exercise</option>
              {availableExercises.map((ex, index) => (
                <option key={index} value={ex.name}>{ex.name}</option>
              ))}
            </select>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-green-700">Repetitions</label>
          <input
            type="number"
            value={exercise.reps}
            onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
            className="w-full border border-green-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Enter repetitions"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!exercise.name.trim() || !exercise.reps}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-6 disabled:bg-gray-300 focus:outline-none focus:ring focus:ring-green-200"
        >
          Add
        </button>
      </div>
      <ExerciseList exercises={exercises} removeExercise={removeExercise} />
    </div>
  );
}

function ExerciseList({ exercises, removeExercise }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2 text-sm text-green-700">Current Exercises</h3>
      {exercises.length === 0 ? (
        <p className="text-green-500 text-sm italic">No exercises added yet</p>
      ) : (
        <ul className="space-y-2">
          {exercises.map((exercise, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-2 rounded border border-green-200 text-sm">
              <div>
                <span className="font-medium text-green-800">{exercise.name}</span>
                <span className="ml-2 text-green-600">({exercise.repetitions} reps)</span>
              </div>
              <button
                onClick={() => removeExercise(index)}
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