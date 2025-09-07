// src/components/RentNavbar.jsx
import React, { useState, useEffect } from 'react';
import { useAuthStore } from "../store/authStore";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const fullText = "List your farm equipment for rent";

const RentNavbar = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const typingSpeed = 75;
    const deletingSpeed = 100;
    const delayBetweenCycles = 1500;

    if (isTyping) {
      if (textIndex < fullText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, textIndex + 1));
          setTextIndex(textIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setIsTyping(false), delayBetweenCycles);
      }
    } else {
      if (textIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, textIndex - 1));
          setTextIndex(textIndex - 1);
        }, deletingSpeed);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setIsTyping(true), delayBetweenCycles);
      }
    }
  }, [textIndex, isTyping]);

  const handleLogout = () => {
    logout();
    console.log("User logged out");
  };

  const handleRentalsPageClick = () => {
    navigate('/RentalsPage');
  };

  const handleProfileClick = () => {
    navigate('/ViewProfile');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-900 p-4 flex justify-between items-center shadow-lg z-50">
      <div className="flex items-center">
        <img src={logo} alt="FarmSpace Logo" className="h-10 mr-3" />
        <span className="text-yellow-400 text-xl font-bold overflow-hidden whitespace-nowrap border-r-2 border-green-500 pr-2">
          {displayedText}
        </span>
      </div>

      <ul className="flex space-x-6 text-white text-lg">
        <li>
          <button className="hover:text-yellow-400 transition-colors" onClick={handleRentalsPageClick}>
            Rentals
          </button>
        </li>
        <li>
          <button className="hover:text-yellow-400 transition-colors" onClick={handleProfileClick}>
            Profile
          </button>
        </li>
        <li>
          <button className="bg-green-700 hover:bg-green-600 text-white py-1 px-3 rounded-md transition-colors" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default RentNavbar;