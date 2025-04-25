import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    <div>
                        <h2 className="text-white text-2xl font-bold mb-3 flex items-center">
                            Vesta<span className="text-red-500">Fit</span>
                            <span className="ml-2 bg-red-500 h-1 w-6 rounded-full"></span>
                        </h2>
                        <p className="text-sm text-gray-400 mb-4">
                            Empowering your digital journey.
                        </p>
                        <p className="text-xs text-gray-500">
                            © 2025 VestaFit. All rights reserved.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 relative">
                            <span className="relative z-10">Quick Links</span>
                            <span className="absolute bottom-0 left-0 w-8 h-1 bg-red-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors flex items-center group">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Services
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 relative">
                            <span className="relative z-10">Connect With Us</span>
                            <span className="absolute bottom-0 left-0 w-8 h-1 bg-red-500 rounded-full"></span>
                        </h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" aria-label="Twitter" className="bg-gray-800 hover:bg-red-500 p-2 rounded-full transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" aria-label="Facebook" className="bg-gray-800 hover:bg-red-500 p-2 rounded-full transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" aria-label="Instagram" className="bg-gray-800 hover:bg-red-500 p-2 rounded-full transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                        <p className="text-sm text-gray-400">
                            Subscribe to our newsletter for updates
                        </p>
                        <div className="mt-2 flex">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="bg-gray-800 text-gray-300 py-2 px-3 text-sm rounded-l focus:outline-none focus:ring-1 focus:ring-red-500 w-full"
                            />
                            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-r text-sm transition-colors">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;