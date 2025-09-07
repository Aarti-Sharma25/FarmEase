import React from 'react';
import { motion } from 'framer-motion';
import { AiFillHeart } from 'react-icons/ai';
import { FaCopyright, FaTractor, FaLeaf, FaHandshake } from 'react-icons/fa';
import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 mx-auto my-8"
        >
          {/* About Us Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
          >
            <FaTractor className="text-5xl text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">
              About FarmSpace
            </h1>
            <div className="w-24 h-1 bg-white/80 mx-auto"></div>
          </motion.div>

          <div className="text-left text-white leading-relaxed space-y-6">
            <div className="flex items-start">
              <FaLeaf className="text-white text-xl mt-1 mr-4 flex-shrink-0" />
              <p className="text-lg">
                FarmSpace revolutionizes agricultural equipment sharing by connecting farmers who need affordable access to farming tools with those who have underutilized equipment.
              </p>
            </div>

            <div className="flex items-start">
              <FaTractor className="text-white text-xl mt-1 mr-4 flex-shrink-0" />
              <p className="text-lg">
                Traditional equipment ownership comes with high costs. FarmSpace eliminates these burdens by creating a sharing economy where farmers can access equipment when needed.
              </p>
            </div>

            <div className="flex items-start">
              <FaHandshake className="text-white text-xl mt-1 mr-4 flex-shrink-0" />
              <p className="text-lg">
                For equipment owners, FarmSpace provides an opportunity to generate additional income from idle machinery.
              </p>
            </div>

            <div className="bg-white/20 p-4 rounded-lg border border-white/30">
              <p className="font-semibold text-white">
                Important: Always inspect equipment before use and ensure proper insurance coverage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-green-800 py-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex items-center text-white space-x-2 mb-4">
            <p className="text-lg">Cultivated with</p>
            <AiFillHeart className="text-red-300 text-2xl" />
            <p className="text-lg">by FarmSpace Team</p>
          </div>

          <div className="flex items-center space-x-6 mb-4">
            <a href="#" className="text-white hover:text-green-300 transition-colors">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-green-300 transition-colors">
              <FaWhatsapp className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-green-300 transition-colors">
              <FaTelegram className="text-2xl" />
            </a>
          </div>

          <div className="flex items-center text-white/80 space-x-2 text-sm">
            <FaCopyright />
            <p>2024 FarmSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;