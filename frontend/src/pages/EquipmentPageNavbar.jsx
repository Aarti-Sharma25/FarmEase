import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaTractor, FaUpload, FaShoppingCart, FaSignOutAlt, FaSearch, FaTimes } from 'react-icons/fa';

const FarmSpaceNavbar = ({ searchQuery, setSearchQuery }) => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.additionalFields?.profileImage || null);
  const searchRef = useRef(null);

  useEffect(() => {
    setProfileImage(user?.additionalFields?.profileImage || null);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  // Handle search focus
  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery) {
      setSearchFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchFocused(false);
  };

  // Get first letter of user's name for profile circle
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'F';

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-700 to-emerald-800 py-3 px-4 flex items-center z-50 shadow-lg">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-2 mr-4">
        <FaTractor className="text-white text-2xl" />
        <span className="text-white text-xl font-bold tracking-tight">FarmSpace</span>
      </div>

      {/* Search Bar - Left side with expandable functionality */}
      <div 
        className={`relative transition-all duration-300 ${
          searchFocused ? 'w-72 md:w-96' : 'w-40'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className={`${searchFocused ? 'text-gray-500' : 'text-gray-300'}`} />
          </div>
          <input
            ref={searchRef}
            type="text"
            placeholder={searchFocused ? "Search for equipment..." : "Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className={`w-full pl-10 pr-8 py-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              searchFocused ? '' : 'cursor-pointer'
            }`}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FaTimes className="text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {/* Spacer to push right-side content to the edge */}
      <div className="flex-grow"></div>

      {/* Navigation Links and Profile - Right side */}
      <div className="flex items-center space-x-4">
        {/* Rent Out */}
        <button 
          onClick={() => navigate('/sell')}  
          className="text-white hover:text-green-300 transition-colors flex flex-col items-center group"
        >
          <FaUpload className="text-xl mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-xs">Rent Out</span>
        </button>
        
        
        
        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="text-white hover:text-green-300 transition-colors flex flex-col items-center group"
        >
          <FaSignOutAlt className="text-xl mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-xs">Logout</span>
        </button>
        
        {/* User Profile Section */}
        <div className="relative ml-2">
          <button
            onClick={toggleDropdown}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-green-300 text-green-700 font-bold text-lg group-hover:border-green-100 transition-colors">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span>{userInitial}</span>
              )}
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-green-200"
              onMouseLeave={closeDropdown}
            >
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                <div className="font-medium truncate">{user?.email}</div>
              </div>
              
              <button
                onClick={() => {
                  closeDropdown();
                  navigate('/viewprofile');
                }}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                View Profile
              </button>
              
              <button
                onClick={() => {
                  closeDropdown();
                  navigate('/profile');
                }}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default FarmSpaceNavbar;