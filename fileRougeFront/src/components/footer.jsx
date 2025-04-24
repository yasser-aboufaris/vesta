import React from 'react';
function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-white text-2xl font-bold mb-2">
                            Vesta<span className="text-red-500">Fit</span>
                        </h2>
                        <p className="text-sm text-gray-400">
                            Empowering your digital journey.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-red-400 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Twitter" className="hover:text-red-400">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="Facebook" className="hover:text-red-400">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-red-400">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>


            </div>
        </footer>
    );
}

export default Footer;
