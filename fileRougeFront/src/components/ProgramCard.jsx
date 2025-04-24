import React from 'react';

const ProgramCard = () => {
    console.log("wassap ma boy");

    return (
        <div className="bg-zinc-900 text-white shadow-lg rounded-2xl overflow-hidden w-64 hover:shadow-2xl transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-64 w-full">
                <img
                    src="https://picsum.photos/300/400"
                    alt="Program Poster"
                    className="object-cover h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Info Section */}
            <div className="p-4">
                <h2 className="text-lg font-bold">Train</h2>
                <p className="text-sm text-gray-400 mb-2">by Yasser</p>
                <p className="text-sm text-gray-300 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam facilis vitae dolores eos sed, ut qui magnam.
                </p>
            </div>
        </div>
    );
};

export default ProgramCard;
