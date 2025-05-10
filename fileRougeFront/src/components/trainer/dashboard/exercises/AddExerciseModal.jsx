import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddExerciseModal = ({ isOpen, onClose, onAddExercise }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    
    if (!name) {
      setError('Exercise name is required');
      return;
    }
    
    try {
      setLoading(true);
      await onAddExercise({
        name,
        description: description || null
      });
      resetForm();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add exercise');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Add New Exercise</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
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
            <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="name-input">
              Exercise Name *
            </label>
            <input
              className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              id="name-input"
              type="text"
              placeholder="E.g., Push-ups"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="description-input">
              Description <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <textarea
              className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              id="description-input"
              rows="4"
              placeholder="E.g., Perform with hands shoulder-width apart and maintain proper form..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-end">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClose}
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

export default AddExerciseModal;