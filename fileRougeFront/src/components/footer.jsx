import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 py-10 border-t border-gray-800">
            <div className="container mx-auto px-6">
                {/* Main footer content */}
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-8">
                        <h2 className="text-white text-2xl font-bold mb-3 flex items-center">
                            Vesta<span className="text-indigo-400">Fit</span>
                            <span className="ml-2 bg-indigo-500 h-1 w-6 rounded-full"></span>
                        </h2>
                        <p className="text-sm text-gray-400 mb-4">
                            Empowering your digital journey.
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4 mb-4">
                            {[Twitter, Facebook, Instagram].map((Icon) => (
                                <a key={Icon.name} href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>

                    </div>

                    {/* Quick Links */}
                    <div className="w-full md:w-1/3 mb-8">
                        <h3 className="text-white font-semibold mb-4">
                            Quick Links
                        </h3>
                        <div className="flex flex-col space-y-2">
                            {["Home", "About", "Services", "Contact"].map((text) => (
                                <a key={text} href="#" className="hover:text-white transition-colors">
                                    {text}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="w-full md:w-1/3 mb-8">
                        <h3 className="text-white font-semibold mb-4">
                            Connect With Us
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                            Subscribe to our newsletter
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-gray-800 text-gray-300 p-2 text-sm rounded-l w-full"
                            />
                            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-r text-sm">
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-4 mt-2">
                    <p className="text-xs text-gray-500 text-center">
                        © 2025 VestaFit. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;