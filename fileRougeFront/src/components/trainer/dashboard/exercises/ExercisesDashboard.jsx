import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import ExercisesTable from './ExercisesTable';
import AddExerciseModal from './AddExerciseModal';
import ExercisesStatistics from './ExercisesStatistics';

// ExercisesDashboard Component
const ExercisesDashboard = () => {
  // --- CONFIGURE AXIOS DEFAULTS ---
  const API_BASE_URL = 'http://127.0.0.1:8000/api';
  const token = '4|TvSUuX8wbR26C91OWz11LgFbK7NillVH1CB8KTTU143f155e';

  // Set up axios defaults inside the component
  useEffect(() => {
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Accept'] = 'application/json';
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch exercises on mount
  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/exercises');
      setExercises(data);
    } catch (err) {
      console.error('Error fetching exercises:', err);
      setError('Failed to load exercises. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = async (exerciseData) => {
    try {
      const response = await axios.post('/exercises', exerciseData);
      // on success, refresh list and return the created record
      await fetchExercises();
      return response.data;
    } catch (err) {
      console.error('Error adding exercise:', err);
      if (err.response?.status === 409) {
        throw new Error('Exercise already exists');
      }
      if (err.response?.data?.detail) {
        throw new Error(err.response.data.detail);
      }
      throw new Error('Failed to add exercise. Please try again.');
    }
  };

  const handleDeleteExercise = async (id) => {
    if (!window.confirm('Are you sure you want to delete this exercise?')) return;
    try {
      await axios.delete(`/exercise/${id}`);
      setExercises(prev => prev.filter(ex => ex.id !== id));
    } catch (err) {
      console.error('Error deleting exercise:', err);
      alert('Failed to delete exercise. Please try again.');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Exercises Database</h1>
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={18} className="mr-1" />
          Add New Exercise
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            className="ml-4 underline text-red-700"
            onClick={fetchExercises}
          >
            Try Again
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-green-500 border-r-transparent align-middle"></div>
          <p className="mt-2 text-gray-600">Loading exercises...</p>
        </div>
      ) : (
        <>
          <ExercisesStatistics exercises={exercises} />
          <ExercisesTable exercises={exercises} onDeleteExercise={handleDeleteExercise} />
        </>
      )}
      
      <AddExerciseModal
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)}
        onAddExercise={handleAddExercise}
      />
    </>
  );
};

export default ExercisesDashboard;
