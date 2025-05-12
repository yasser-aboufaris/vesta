export default function WeeklySummary({ days, currentDay }) {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Weekly Plan Summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border text-left">Day</th>
              <th className="py-2 px-4 border text-left">Meals</th>
              <th className="py-2 px-4 border text-left">Exercises</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.day_number} className={currentDay === day.day_number ? 'bg-blue-50' : ''}>
                <td className="py-2 px-4 border font-medium">Day {day.day_number}</td>
                <td className="py-2 px-4 border">
                  {day.meals.length === 0 ? (
                    <span className="text-gray-500">None</span>
                  ) : (
                    <ul className="list-disc pl-5">
                      {day.meals.map((meal, i) => (
                        <li key={i}>
                          {meal.name} ({meal.grams}g)
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {day.exercises.length === 0 ? (
                    <span className="text-gray-500">None</span>
                  ) : (
                    <ul className="list-disc pl-5">
                      {day.exercises.map((exercise, i) => (
                        <li key={i}>
                          {exercise.name} ({exercise.repetitions} reps)
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}