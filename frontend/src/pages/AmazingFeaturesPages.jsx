import React from "react";
import logoSupport from './free_Support.png';
import logoTransactions from './student_2.png';
import logoSafety from './stay_safe.png';

const AmazingFeaturePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-12 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          FarmSpace Equipment Rental
        </h1>
        <p className="text-xl text-green-600 max-w-3xl mx-auto">
          Connecting farmers to share agricultural equipment at affordable prices
        </p>
      </div>
      
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
          Our Amazing Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Affordable Rentals */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-xl overflow-hidden border border-green-200 transition-all duration-300 hover:shadow-2xl hover:translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="bg-green-200 rounded-full p-4 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <img 
                  src={logoTransactions} 
                  alt="Affordable Rentals" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-green-800 text-center mb-4">
                Affordable Equipment Rentals
              </h3>
              <p className="text-green-700 flex-grow">
                Access high-quality farming equipment at budget-friendly rates. 
                Rent tractors, harvesters, and other essential tools without the 
                high costs of ownership.
              </p>
            </div>
          </div>

          {/* Feature 2: Equipment Sharing */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-xl overflow-hidden border border-green-200 transition-all duration-300 hover:shadow-2xl hover:translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="bg-green-200 rounded-full p-4 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <img 
                  src={logoSupport} 
                  alt="Equipment Sharing" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-green-800 text-center mb-4">
                Share Your Equipment
              </h3>
              <p className="text-green-700 flex-grow">
                Monetize your underutilized farming equipment by renting it to 
                other farmers. Earn extra income while helping fellow farmers 
                access essential tools.
              </p>
            </div>
          </div>

          {/* Feature 3: Secure Platform */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-xl overflow-hidden border border-green-200 transition-all duration-300 hover:shadow-2xl hover:translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="bg-green-200 rounded-full p-4 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <img 
                  src={logoSafety} 
                  alt="Secure Platform" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-green-800 text-center mb-4">
                Safe & Secure Platform
              </h3>
              <p className="text-green-700 flex-grow">
                Transparent farmer-to-farmer transactions with verified profiles 
                and secure payments. Our platform ensures trust and safety for 
                all equipment rentals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Benefits Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
          Why Choose FarmSpace?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-green-100">
            <div className="text-green-600 text-2xl mb-2">🌾</div>
            <h3 className="font-bold text-lg text-green-800 mb-2">Seasonal Flexibility</h3>
            <p className="text-green-700">
              Rent equipment only when you need it, avoiding off-season storage costs
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-green-100">
            <div className="text-green-600 text-2xl mb-2">🔧</div>
            <h3 className="font-bold text-lg text-green-800 mb-2">Maintenance Support</h3>
            <p className="text-green-700">
              Access to our network of certified technicians for equipment maintenance
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-green-100">
            <div className="text-green-600 text-2xl mb-2">📱</div>
            <h3 className="font-bold text-lg text-green-800 mb-2">Easy Booking</h3>
            <p className="text-green-700">
              Simple app-based booking and payment system for hassle-free transactions
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto mt-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Join the Farming Revolution</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Become part of a community that's making farming equipment accessible and affordable for everyone
        </p>
        <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-50 transition-colors">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default AmazingFeaturePage;