// src/pages/RentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRentalStore } from '../store/rentalStore.jsx'; 
import RentNavbar from './RentNavbar'; 

const RentPage = () => {
  const { fetchRentals } = useRentalStore();
  const [equipment, setEquipment] = useState({
    equipmentName: '',
    description: '',
    rentalPrice: '',
    rentalPeriod: 'hour',
    availability: true,
    location: '',
    contactInfo: '',
    image: null,
    rentalManName: '',      
    rentalManPhone: '',     
    rentalManEmail: '',     
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setEquipment({ 
      ...equipment, 
      [name]: type === 'checkbox' ? checked : (files ? files[0] : value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (equipment.rentalPrice <= 0) {
      alert('Rental price must be greater than zero.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('equipmentName', equipment.equipmentName);
    formData.append('description', equipment.description);
    formData.append('rentalPrice', equipment.rentalPrice);
    formData.append('rentalPeriod', equipment.rentalPeriod);
    formData.append('availability', equipment.availability);
    formData.append('location', equipment.location);
    formData.append('contactInfo', equipment.contactInfo);
    formData.append('image', equipment.image);
    formData.append('rentalManName', equipment.rentalManName);
    formData.append('rentalManPhone', equipment.rentalManPhone);
    formData.append('rentalManEmail', equipment.rentalManEmail);

    try {
      const res = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert('Equipment listed for rent successfully!');
        fetchRentals();
        setEquipment({ 
          equipmentName: '', 
          description: '', 
          rentalPrice: '', 
          rentalPeriod: 'hour',
          availability: true,
          location: '',
          contactInfo: '',
          image: null,
          rentalManName: '',      
          rentalManPhone: '',
          rentalManEmail: '',
        });
        navigate('/RentalsPage');
      } else {
        const errorData = await res.json();
        alert(`Failed to list equipment: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while listing the equipment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <RentNavbar />
      <div className="max-w-3xl mx-auto mt-20 p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">List Farm Equipment for Rent</h2>
            <p className="mt-2 text-green-100">Share your equipment with fellow farmers</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Equipment Information */}
              <div className="md:col-span-2 border-b pb-4">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Equipment Details</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="equipmentName">
                    Equipment Name *
                  </label>
                  <input 
                    type="text" 
                    name="equipmentName" 
                    value={equipment.equipmentName} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tractor, Harvester, etc."
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                    Description *
                  </label>
                  <textarea
                    name="description" 
                    value={equipment.description} 
                    onChange={handleChange} 
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe features, condition, and specifications"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="rentalPrice">
                      Rental Price (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                      <input 
                        type="number" 
                        name="rentalPrice" 
                        value={equipment.rentalPrice} 
                        onChange={handleChange} 
                        required
                        min="0"
                        className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Price per period"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="rentalPeriod">
                      Rental Period *
                    </label>
                    <select 
                      name="rentalPeriod" 
                      value={equipment.rentalPeriod} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="hour">Per Hour</option>
                      <option value="day">Per Day</option>
                      <option value="week">Per Week</option>
                      <option value="month">Per Month</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4 flex items-center">
                  <input
                    id="availability"
                    name="availability"
                    type="checkbox"
                    checked={equipment.availability}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 block text-gray-700 font-medium" htmlFor="availability">
                    Currently Available
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                      Location *
                    </label>
                    <input 
                      type="text" 
                      name="location" 
                      value={equipment.location} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Where is the equipment located?"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="contactInfo">
                      Contact Info *
                    </label>
                    <input 
                      type="text" 
                      name="contactInfo" 
                      value={equipment.contactInfo} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Phone number for inquiries"
                    />
                  </div>
                </div>
              </div>
              
              {/* Rental Manager Information */}
              <div className="md:col-span-2 border-b pb-4">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Rental  Information</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="rentalManName">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    name="rentalManName" 
                    value={equipment.rentalManName} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="rentalManPhone">
                      Phone Number *
                    </label>
                    <input 
                      type="text" 
                      name="rentalManPhone" 
                      value={equipment.rentalManPhone} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your contact number"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="rentalManEmail">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      name="rentalManEmail" 
                      value={equipment.rentalManEmail} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
              </div>
              
              {/* Equipment Image */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
                  Equipment Image *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-green-400 rounded-lg cursor-pointer bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="py-1 text-sm text-gray-600">
                        {equipment.image ? equipment.image.name : 'Upload equipment photo'}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      name="image" 
                      onChange={handleChange} 
                      required
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-1/2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-all duration-300 disabled:opacity-75"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'List Equipment for Rent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentPage;