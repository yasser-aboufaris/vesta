import { useState } from 'react';

export default function JsonOutput({ jsonOutput }) {
  const [showJson, setShowJson] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert('JSON copied to clipboard!');
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowJson(!showJson)}
          className="text-blue-600 font-medium"
        >
          {showJson ? 'Hide' : 'Show'} JSON Output
        </button>
        {showJson && (
          <button
            onClick={copyToClipboard}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
          >
            Copy to Clipboard
          </button>
        )}
      </div>
      {showJson && (
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
          {jsonOutput}
        </pre>
      )}
    </div>
  );
}