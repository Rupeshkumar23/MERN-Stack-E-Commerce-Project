import React from 'react'
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8">
        {/* Main container */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left py-8">
            {/* Section 1: Contact */}
            <div className="flex-1 min-w-62.5">
                <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
                <div className="flex flex-col items-center md:items-start gap-2 text-gray-400 mb-2">
                    <p className="flex items-center gap-2">
                        <FaPhone size={16}/>
                        Phone : +91 9043017689
                    </p>
                    <p className="flex items-center gap-2">
                        <FaEnvelope size={16}/>
                        Email : tutorjoesofficial@gmail.com
                    </p>
                </div>
            </div>

            {/* Section 2: Social */}
            <div className="flex-1 min-w-62.5 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 text-white">Follow Me</h3>
                <div className="flex gap-4">
                    <a href="#" target="_blank" className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-blue-500">
                        <FaGithub size={28} />
                    </a>
                    <a href="#" target="_blank" className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-blue-500">
                        <FaLinkedin size={28} />
                    </a>
                    <a href="#" target="_blank" className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-red-500">
                        <FaYoutube size={28} />
                    </a>
                    <a href="#" target="_blank" className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-pink-500">
                        <FaInstagram size={28} />
                    </a>
                </div>
            </div>

            {/* Section 3: About */}
            <div className="flex-1 min-w-62.5">
                <h3 className="text-xl font-semibold mb-4 text-white">About</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Providing professional e-commerce solutions to help you grow your online business.
                </p>
            </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
            &copy; 2026 Tutor Joes. All rights reserved
        </div>
    </footer>
  )
}

export default Footer