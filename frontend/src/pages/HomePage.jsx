import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Welcome to <span className="text-green-500">FarmSpace</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10">
            Rent farming equipment or earn from your idle machinery. Join our sustainable farming community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/sell" 
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
            >
              List Your Equipment
            </Link>
            <Link 
              to="/ProductPage" 
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
            >
              Browse Equipment
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose <span className="text-green-600">FarmSpace</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-green-500 text-5xl mb-6">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Earn Money</h3>
              <p className="text-gray-600">
                Make income from equipment that's sitting idle in your barn or shed.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-green-500 text-5xl mb-6">🔧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Save Money</h3>
              <p className="text-gray-600">
                Rent equipment when you need it instead of buying expensive machinery.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-green-500 text-5xl mb-6">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Verified users and secure payment system for peace of mind.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-green-500 text-5xl mb-6">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Farming</h3>
              <p className="text-gray-600">
                Reduce waste by sharing resources within the farming community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            How <span className="text-white">FarmSpace</span> Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-white text-green-700 rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create an Account</h3>
              <p className="text-green-100">
                Sign up as a farmer or equipment owner in minutes.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-white text-green-700 rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">List or Browse</h3>
              <p className="text-green-100">
                Add your equipment for rent or find what you need.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-white text-green-700 rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Connect & Rent</h3>
              <p className="text-green-100">
                Agree on terms and schedule the rental period.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-white text-green-700 rounded-full text-2xl font-bold mb-6">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Farm Better</h3>
              <p className="text-green-100">
                Get your work done or earn from your equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Equipment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Popular Equipment
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Browse some of our most commonly rented farming equipment
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Equipment 1 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1592841200221-6534bd4216d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Tractor" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">John Deere Tractor</h3>
                <p className="text-gray-600 mb-4">75 HP with loader attachment</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">$150/day</span>
                  <Link to="/equipment/1" className="text-green-600 hover:text-green-700 font-semibold">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Equipment 2 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1599395259911-5005c873f5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Harvester" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Combine Harvester</h3>
                <p className="text-gray-600 mb-4">For wheat and grain harvesting</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">$300/day</span>
                  <Link to="/equipment/2" className="text-green-600 hover:text-green-700 font-semibold">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Equipment 3 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80" 
                alt="Seeder" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Precision Seeder</h3>
                <p className="text-gray-600 mb-4">12-row with GPS guidance</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">$120/day</span>
                  <Link to="/equipment/3" className="text-green-600 hover:text-green-700 font-semibold">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/ProductPage" 
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Browse All Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            What Farmers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="absolute top-4 left-4 text-green-500 text-6xl opacity-10 font-serif">"</div>
              <p className="text-lg text-gray-700 italic mb-6 relative z-10">
                "FarmSpace helped me afford the tractor I needed for harvest season without the huge investment. The owner was just 10 miles away and even delivered it to my farm!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="John D." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">John D.</h4>
                  <p className="text-gray-600">Small Farm Owner</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="absolute top-4 left-4 text-green-500 text-6xl opacity-10 font-serif">"</div>
              <p className="text-lg text-gray-700 italic mb-6 relative z-10">
                "I've earned over $5,000 this year renting out my spare equipment when I'm not using it. FarmSpace makes it so easy to connect with local farmers who need what I have."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah K." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sarah K.</h4>
                  <p className="text-gray-600">Equipment Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Farming Community?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Sign up today and start renting equipment or earning from your machinery in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-white text-green-600 hover:bg-gray-100 font-semibold rounded-lg transition duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-green-600 font-semibold rounded-lg transition duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;