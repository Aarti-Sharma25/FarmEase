import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTractor } from 'react-icons/fa'; // Using react-icons for the logo

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-green-800 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <FaTractor className={`text-3xl ${scrolled ? 'text-green-600' : 'text-white'}`} />
            <span className={`text-2xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              Farm<span className="text-green-400">Space</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'}`}
            >
              About
            </Link>
           
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg transition ${scrolled ? 'text-green-600 hover:bg-green-50' : 'text-white hover:bg-green-700'}`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`px-4 py-2 rounded-lg transition ${scrolled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white text-green-800 hover:bg-green-100'}`}
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`outline-none mobile-menu-button ${isOpen ? 'open' : ''}`}
            >
              <svg
                className={`w-6 h-6 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} ${scrolled ? 'bg-white' : 'bg-green-800'}`}>
        <div className="container mx-auto px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/"
            className={`block py-2 px-4 rounded ${scrolled ? 'text-gray-700 hover:bg-green-50' : 'text-white hover:bg-green-700'}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block py-2 px-4 rounded ${scrolled ? 'text-gray-700 hover:bg-green-50' : 'text-white hover:bg-green-700'}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
  
          <div className="pt-2 border-t border-gray-200">
            <Link
              to="/login"
              className={`block py-2 px-4 rounded ${scrolled ? 'text-green-600 hover:bg-green-50' : 'text-white hover:bg-green-700'}`}
              onClick={closeMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`block py-2 px-4 rounded mt-2 ${scrolled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white text-green-800 hover:bg-green-100'}`}
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;