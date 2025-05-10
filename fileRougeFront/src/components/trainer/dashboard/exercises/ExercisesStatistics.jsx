import React from 'react';
import { BarChart, FileText, BookOpen } from 'lucide-react';

const ExercisesStatistics = ({ exercises }) => {
  // Calculate statistics
  const totalExercises = exercises.length;
  const exercisesWithDescription = exercises.filter(exercise => 
    exercise.description && exercise.description.trim().length > 0
  ).length;
  const exercisesWithoutDescription = totalExercises - exercisesWithDescription;
  
  // Calculate average description length
  const averageDescriptionLength = exercisesWithDescription > 0 
    ? Math.round(
        exercises
          .filter(exercise => exercise.description && exercise.description.trim().length > 0)
          .reduce((sum, exercise) => sum + exercise.description.length, 0) / exercisesWithDescription
      )
    : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-800">Exercise Statistics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <BarChart size={24} className="text-blue-600" />
            </div>
            <p className="text-lg font-semibold text-blue-600">Total Exercises</p>
            <p className="text-3xl font-bold">{totalExercises}</p>
            <p className="text-sm text-gray-500">In Database</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <FileText size={24} className="text-blue-600" />
            </div>
            <p className="text-lg font-semibold text-blue-600">With Description</p>
            <p className="text-3xl font-bold">{exercisesWithDescription}</p>
            <p className="text-sm text-gray-500">
              {totalExercises > 0 ? `(${Math.round((exercisesWithDescription / totalExercises) * 100)}%)` : '(0%)'}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-center flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <p className="text-lg font-semibold text-blue-600">Avg. Description</p>
            <p className="text-3xl font-bold">{averageDescriptionLength}</p>
            <p className="text-sm text-gray-500">Characters</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesStatistics;