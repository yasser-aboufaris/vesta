import React from 'react';
import PropTypes from 'prop-types';

const ProgramCard = ({
    title = 'TrainHard',
    creator = 'Yasser',
    tags = ['Strength', 'HIIT', 'Advanced'],
    description = 'Get ready to push your limits. This program is designed to take your fitness to the next level—no excuses.',
    duration = '6 weeks',
    participants = '8',
    level = 'Pro',
}) => {
    return (
        <div
            className="bg-black text-white shadow-lg rounded-2xl overflow-hidden w-full sm:w-72 transition-all duration-300 cursor-pointer border border-gray-700 hover:shadow-lg hover:shadow-yellow-400/20"
        >


            {/* Info Section */}
            <div className="p-5 space-y-3 bg-black text-white">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold tracking-wider flex items-center">
                        {title}
                        <span className="ml-2 bg-red-600 h-1 w-5 rounded-full" />
                    </h2>
                    <span className="text-xs px-2 py-1 bg-red-600 text-white rounded-full">{level}</span>
                </div>

                <p className="text-xs text-gray-400 italic flex items-center">
                    <span className="inline-block mr-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    by {creator}
                </p>

                <div className="flex space-x-2 text-xs">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-yellow-400 transition-all duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-gray-400">{description}</p>

                <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-gray-700"></div>
                            <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-700"></div>
                            <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-gray-700 flex items-center justify-center text-xs text-white">
                                +{parseInt(participants) - 2}
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 ml-2">{participants} people joined</span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {duration}
                    </div>
                </div>

                <button
                    className="w-full mt-2 px-4 py-2 bg-red-600 hover:bg-gray-300 hover:text-red-900 text-sm text-white rounded-lg transition-all duration-300 flex items-center justify-center font-medium"
                    aria-label={`Start the ${title} fitness program`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Start Training
                </button>
            </div>
        </div>
    );
};

ProgramCard.propTypes = {
    title: PropTypes.string,
    creator: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    duration: PropTypes.string,
    participants: PropTypes.string,
    level: PropTypes.string,
};

export default ProgramCard;