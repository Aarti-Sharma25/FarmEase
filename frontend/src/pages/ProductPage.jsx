import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRentalStore } from '../store/rentalStore';
import EquipmentPageNavbar from './EquipmentPageNavbar';
import { FaHeart, FaHeartBroken, FaTractor, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const BrowseEquipmentPage = () => {
  const { rentals = [] } = useRentalStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [likedEquipment, setLikedEquipment] = useState(new Set());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();

  // Filter equipment based on search query and category
  const filteredEquipment = rentals.filter(item => {
    const matchesSearch = item?.equipmentName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item?.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Toggle like status
  const toggleLike = (equipmentId) => {
    setLikedEquipment(prev => {
      const updated = new Set(prev);
      updated.has(equipmentId) ? updated.delete(equipmentId) : updated.add(equipmentId);
      return updated;
    });
  };

  const handleRentNow = (equipment) => {
    navigate('/rent', { state: { equipment } });
  };

  // Equipment categories
  const categories = [
    { id: 'all', name: 'All Equipment', icon: <FaTractor /> },
    { id: 'tractors', name: 'Tractors', icon: <FaTractor /> },
    { id: 'harvesters', name: 'Harvesters', icon: <FaTractor /> },
    { id: 'plows', name: 'Plows', icon: <FaTractor /> },
    { id: 'irrigation', name: 'Irrigation', icon: <FaTractor /> },
    { id: 'planters', name: 'Planters', icon: <FaTractor /> },
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Navbar */}
      <EquipmentPageNavbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main Content - Fixed spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Browse Farming Equipment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect equipment for your farming needs at affordable rental rates
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaTractor className="mr-2 text-green-600" /> Equipment Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                  categoryFilter === category.id
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                }`}
                onClick={() => setCategoryFilter(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Info */}
        {searchQuery && (
          <div className="mb-6 flex items-center text-gray-600">
            <FaSearch className="mr-2" />
            <p>Search results for: <span className="font-semibold">"{searchQuery}"</span></p>
          </div>
        )}

        {/* Equipment Grid */}
        {filteredEquipment.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-12">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
              <FaSearch className="text-2xl text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {rentals.length === 0 ? 'No equipment available' : 'No matching equipment found'}
            </h3>
            <p className="text-gray-500 max-w-md">
              {rentals.length === 0 
                ? 'It seems there are no equipment listings at the moment. Check back later or list your own equipment.'
                : 'We couldn\'t find any equipment matching your search. Try different keywords or categories.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipment.map(equipment => (
              <div
                key={equipment._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                {/* Equipment Image */}
                <div className="relative">
                  <img
                    src={equipment.image || '/default-equipment.jpg'}
                    alt={equipment.equipmentName}
                    className="w-full h-52 object-cover"
                  />
                  
                  {/* Like Button */}
                  <button
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                    onClick={() => toggleLike(equipment._id)}
                  >
                    {likedEquipment.has(equipment._id) ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaHeartBroken className="text-gray-500 text-lg" />
                    )}
                  </button>
                </div>

                {/* Equipment Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{equipment.equipmentName}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {equipment.category || 'Agricultural'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {equipment.description}
                  </p>
                  
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <FaMapMarkerAlt className="mr-1.5 text-green-600 flex-shrink-0" />
                    <span className="truncate">{equipment.location || 'Farm Location'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-500 text-xs">Daily Rate</p>
                      <p className="text-xl font-bold text-green-600">
                        ₹{equipment.rentalPrice}
                        {equipment.originalPrice && (
                          <span className="text-gray-400 text-xs line-through ml-2">
                            ₹{equipment.originalPrice}
                          </span>
                        )}
                      </p>
                    </div>
                    
                    {equipment.originalPrice && (
                      <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        {Math.round(
                          ((equipment.originalPrice - equipment.rentalPrice) / 
                          equipment.originalPrice) * 100
                        )}% OFF
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                    onClick={() => handleRentNow(equipment)}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseEquipmentPage;