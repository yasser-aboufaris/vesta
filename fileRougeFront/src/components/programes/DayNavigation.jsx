export default function DayNavigation({ currentDay, setCurrentDay }) {
  return (
    <div className="flex items-center justify-between mb-6 bg-gray-100 p-3 rounded">
      <button
        onClick={() => setCurrentDay(currentDay - 1)}
        disabled={currentDay === 1}
        className={`px-4 py-2 rounded ${
          currentDay === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'
        }`}
      >
        Previous Day
      </button>
      <h2 className="text-xl font-bold">Day {currentDay}</h2>
      <button
        onClick={() => setCurrentDay(currentDay + 1)}
        disabled={currentDay === 7}
        className={`px-4 py-2 rounded ${
          currentDay === 7 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'
        }`}
      >
        Next Day
      </button>
    </div>
  );
}