import { useState } from 'react';
import axios from 'axios';
import DayNavigation from './DayNavigation';
import MealSection from './MealSection';
import ExerciseSection from './ExerciseSection';
import WeeklySummary from './WeeklySummary';

export default function WeeklyPlanBuilder() {
  const initialPlan = {
    name: 'My Health Plan',
    days: Array(7)
      .fill()
      .map((_, i) => ({
        day_number: i + 1,
        meals: [],
        exercises: [],
      })),
  };

  const [plan, setPlan] = useState(initialPlan);
  const [currentDay, setCurrentDay] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const addMeal = (mealId, grams) => {
    if (!mealId || !grams) return;
    const updatedDays = [...plan.days];
    updatedDays[currentDay - 1].meals.push({
      meal_id: parseInt(mealId, 10),
      grams: parseInt(grams, 10),
    });
    setPlan({ ...plan, days: updatedDays });
  };

  const addExercise = (exerciseId, reps) => {
    if (!exerciseId || !reps) return;
    const updatedDays = [...plan.days];
    updatedDays[currentDay - 1].exercises.push({
      exercise_id: parseInt(exerciseId, 10),
      repetitions: parseInt(reps, 10),
    });
    setPlan({ ...plan, days: updatedDays });
  };

  const removeMeal = (index) => {
    const updatedDays = [...plan.days];
    updatedDays[currentDay - 1].meals.splice(index, 1);
    setPlan({ ...plan, days: updatedDays });
  };

  const removeExercise = (index) => {
    const updatedDays = [...plan.days];
    updatedDays[currentDay - 1].exercises.splice(index, 1);
    setPlan({ ...plan, days: updatedDays });
  };

  const submitPlan = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
  
    // 1. Clean out any empty meal/exercise entries
    const cleanedDays = plan.days.map(day => ({
      day_number: day.day_number,
      meals: day.meals.filter(m => m.meal_id && m.grams),
      exercises: day.exercises.filter(e => e.exercise_id && e.repetitions),
    }));
  
    const cleanedPlan = {
      ...plan,
      days: cleanedDays,
    };
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/programs',
        cleanedPlan
      );
      setSubmitStatus('success');
      setSubmitMessage('Your health plan has been successfully submitted!');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error.response?.data?.message ||
          'An error occurred while submitting your plan'
      );
      console.error('Validation errors:', error.response?.data?.errors);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const isPlanEmpty = plan.days.every(
    (day) => day.meals.length === 0 && day.exercises.length === 0
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-800">Weekly Health Plan Builder</h1>
      <DayNavigation currentDay={currentDay} setCurrentDay={setCurrentDay} />

      <div className="grid grid-cols-1 gap-6 mb-6">
        <MealSection
          meals={plan.days[currentDay - 1].meals}
          addMeal={addMeal}
          removeMeal={removeMeal}
        />
        <ExerciseSection
          exercises={plan.days[currentDay - 1].exercises}
          addExercise={addExercise}
          removeExercise={removeExercise}
        />
      </div>

      <WeeklySummary days={plan.days} currentDay={currentDay} />

      {submitStatus && (
        <div className={`mt-4 p-3 rounded ${
          submitStatus === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {submitMessage}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={submitPlan}
          disabled={isPlanEmpty || isSubmitting}
          className={`px-6 py-3 rounded font-medium focus:outline-none focus:ring focus:ring-green-200 ${
            isPlanEmpty || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Health Plan'}
        </button>
      </div>
    </div>
  );
}