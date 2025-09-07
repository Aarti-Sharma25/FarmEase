// src/pages/RentCheckoutPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTractor, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const RentCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { equipment } = location.state || {};

  if (!equipment) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaTractor className="text-2xl text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Equipment Not Found</h2>
          <p className="text-gray-600 mb-6">The rental equipment details could not be loaded.</p>
          <button 
            onClick={() => navigate('/ProductPage')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-6 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md"
          >
            Browse Equipment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto pt-12 px-4 pb-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 font-medium mb-6 hover:text-green-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Equipment
        </button>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {equipment.equipmentName} - Rental Details
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Equipment Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-green-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Equipment Information</h2>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span>{equipment.availability ? 'Available' : 'Currently Unavailable'}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={equipment.image || '/default-equipment.jpg'}
                  alt={equipment.equipmentName}
                  className="w-full h-48 object-cover rounded-lg border border-green-100"
                />
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{equipment.equipmentName}</h3>
                <p className="text-gray-600 mb-4">{equipment.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <FaCalendarAlt className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rental Price</p>
                      <p className="font-medium text-green-600">₹{equipment.rentalPrice}/{equipment.rentalPeriod}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <FaMapMarkerAlt className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{equipment.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Manager Contact */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-green-50 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaUser className="text-green-600 mr-2" />
            Contact Rental Manager
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaUser className="text-green-600 text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-lg">{equipment.rentalManName}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaPhone className="text-green-600 text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-lg">{equipment.contactInfo || equipment.rentalManPhone}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaEnvelope className="text-green-600 text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-lg">{equipment.rentalManEmail}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a 
                href={`tel:${equipment.contactInfo || equipment.rentalManPhone}`}
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <FaPhone className="mr-2" /> Call Now
              </a>
              <a 
                href={`mailto:${equipment.rentalManEmail}`}
                className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <FaEnvelope className="mr-2" /> Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentCheckoutPage;