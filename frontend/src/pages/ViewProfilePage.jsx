import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from './profilePic.png';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';

const ViewProfilePage = () => {
    const { user, getProfile } = useAuthStore();
    const navigate = useNavigate();
    const [isValidBase64, setIsValidBase64] = useState(true);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

     const profileImageBase64 = user.additionalFields?.profileImage;
    const isBase64Image = (str) => /^data:image\/[a-zA-Z]+;base64,/.test(str);

    const profileImageSrc = profileImageBase64 && isBase64Image(profileImageBase64)
        ? profileImageBase64
        : defaultProfileImage;

    useEffect(() => {
        if (profileImageBase64 && !isBase64Image(profileImageBase64)) {
            setIsValidBase64(false);
            console.error("Invalid Base64 string for profile image:", profileImageBase64);
        } else {
            setIsValidBase64(true);
        }
    }, [profileImageBase64]);

    const formatFieldLabel = (label) =>
        label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

    const handleEditProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-8 px-6 text-center relative">
                    <div className="absolute top-4 right-4">
                        <div className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Farmer Profile
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                        Agricultural Profile
                    </h1>
                    <p className="text-amber-100 mt-2 max-w-lg mx-auto">
                        View your agricultural profile information
                    </p>
                </div>
                
                {/* Profile Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Left Profile Card */}
                    <div className="bg-gradient-to-b from-amber-100 to-white p-6 md:p-8 flex flex-col items-center border-r border-amber-200">
                        <div className="relative group -mt-16">
                            <div className="relative rounded-full p-1 bg-gradient-to-r from-amber-400 to-orange-400">
                                <img
                                    src={profileImageSrc}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            </div>
                            {!isValidBase64 && (
                                <div className="mt-2 text-red-500 font-semibold text-center">
                                    Invalid profile image format
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                            <div className="flex items-center justify-center mt-2 text-amber-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p>{user.additionalFields?.location || 'Farm Location'}</p>
                            </div>
                        </div>
                        
                        <div className="mt-8 w-full">
                            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                                <h3 className="text-lg font-semibold text-amber-700 mb-3">Farming Stats</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Experience</span>
                                            <span>{user.additionalFields?.experience || '0'} years</span>
                                        </div>
                                        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" 
                                                style={{ width: `${Math.min(parseInt(user.additionalFields?.experience || 0) * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Farming Area</span>
                                            <span>{user.additionalFields?.farmingArea || '0'} acres</span>
                                        </div>
                                        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" 
                                                style={{ width: `${Math.min(parseInt(user.additionalFields?.farmingArea || 0) * 2, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Details Section */}
                    <div className="lg:col-span-2 p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info Column */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-white to-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
                                    <h3 className="text-lg font-semibold text-amber-700 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Personal Information
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.name}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.email}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.additionalFields?.mobileNumber || 'Not provided'}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Alternate Mobile</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.additionalFields?.alternateMobile || 'Not provided'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-white to-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
                                    <h3 className="text-lg font-semibold text-amber-700 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Farm Details
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.additionalFields?.location || 'Not provided'}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Farm Name</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.additionalFields?.hostelName || 'Not provided'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Farm Info Column */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-white to-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
                                    <h3 className="text-lg font-semibold text-amber-700 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Farming Expertise
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Experience (Years)</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.additionalFields?.experience || 'Not provided'}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Farming Area (Acres)</label>
                                            <div className="text-lg font-medium text-gray-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                                {user.additionalFields?.farmingArea || 'Not provided'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-white to-amber-50 p-5 rounded-xl border border-amber-100 shadow-sm">
                                    <h3 className="text-lg font-semibold text-amber-700 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        Farm Description
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">About Your Farm</label>
                                        <div className="text-gray-800 bg-amber-50 p-4 rounded-lg border border-amber-200 min-h-[120px]">
                                            {user.additionalFields?.permanentAddress || 'No description provided'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-medium rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center"
                            >
                                <FiArrowLeft className="mr-2" />
                                Back to Dashboard
                            </button>
                            
                            <button
                                onClick={handleEditProfile}
                                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg shadow hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center"
                            >
                                <FiEdit className="mr-2" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfilePage;