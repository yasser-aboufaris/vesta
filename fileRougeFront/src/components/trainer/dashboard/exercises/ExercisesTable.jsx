import React from 'react';
import { Trash2, Info } from 'lucide-react';

const ExercisesTable = ({ exercises, onDeleteExercise }) => {
  const [expandedId, setExpandedId] = React.useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exercises.map((exercise) => (
              <React.Fragment key={exercise.id}>
                <tr className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exercise.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      {exercise.description ? (
                        <>
                          <span className="truncate max-w-xs">
                            {exercise.description.substring(0, 50)}
                            {exercise.description.length > 50 ? '...' : ''}
                          </span>
                          {exercise.description.length > 50 && (
                            <button
                              onClick={() => toggleExpand(exercise.id)}
                              className="ml-2 text-green-600 hover:text-green-800"
                            >
                              <Info size={16} />
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 italic">No description</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-red-600 hover:text-red-900 flex items-center"
                      onClick={() => onDeleteExercise(exercise.id)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedId === exercise.id && exercise.description && (
                  <tr className="bg-green-50">
                    <td colSpan="4" className="px-6 py-4 text-sm text-gray-800">
                      <div className="ml-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="font-semibold mb-1">Full Description:</h4>
                        <p>{exercise.description}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {exercises.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No exercises found. Add a new exercise to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExercisesTable;
