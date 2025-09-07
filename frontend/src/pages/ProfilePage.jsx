import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import defaultProfileImage from './profilePic.png';

const ProfilePage = () => {
    const { user, updateProfile } = useAuthStore();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || defaultProfileImage,
        mobileNumber: user.mobileNumber || '',
        alternateMobile: user.alternateMobile || '',
        location: user.location || '',
        hostelName: user.hostelName || '',
        experience: user.experience || '',
        farmingArea: user.farmingArea || '',
        permanentAddress: user.permanentAddress || ''
    });
    const [isEditable, setIsEditable] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevData) => ({ ...prevData, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleEdit = () => {
        setIsEditable((prev) => !prev);
    };

    const validateForm = () => {
        const { name, mobileNumber, location, hostelName, experience, permanentAddress } = formData;
        if (!name || !mobileNumber || !location || !hostelName || !experience || !permanentAddress) {
            alert('Please fill in all required fields');
            return false;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobileNumber)) {
            alert('Please enter a valid 10-digit mobile number');
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (validateForm()) {
            if (typeof updateProfile === 'function') {
                await updateProfile(formData);
                setIsEditable(false);
                alert('Profile updated successfully!');
            } else {
                console.error('updateProfile is not a function');
            }
        }
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
                        {isEditable ? "Update your farming information" : "Manage your agricultural profile"}
                    </p>
                </div>
                
                {/* Profile Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Left Profile Card */}
                    <div className="bg-gradient-to-b from-amber-100 to-white p-6 md:p-8 flex flex-col items-center border-r border-amber-200">
                        <div className="relative group -mt-16">
                            <div className="relative rounded-full p-1 bg-gradient-to-r from-amber-400 to-orange-400">
                                <img
                                    src={formData.profileImage}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                                {isEditable && (
                                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <label 
                                            htmlFor="profileImageUpload"
                                            className="cursor-pointer bg-white rounded-full p-2 text-amber-600 shadow-md"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </label>
                                    </div>
                                )}
                            </div>
                            {isEditable && (
                                <input
                                    type="file"
                                    id="profileImageUpload"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                />
                            )}
                        </div>
                        
                        <div className="mt-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                            <div className="flex items-center justify-center mt-2 text-amber-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p>{formData.location || 'Farm Location'}</p>
                            </div>
                        </div>
                        
                        <div className="mt-8 w-full">
                            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                                <h3 className="text-lg font-semibold text-amber-700 mb-3">Farming Stats</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Experience</span>
                                            <span>{formData.experience || '0'} years</span>
                                        </div>
                                        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" 
                                                style={{ width: `${Math.min(parseInt(formData.experience || 0) * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Farming Area</span>
                                            <span>{formData.farmingArea || '0'} acres</span>
                                        </div>
                                        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" 
                                                style={{ width: `${Math.min(parseInt(formData.farmingArea || 0) * 2, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Form Section */}
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
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    readOnly
                                                    className="w-full py-2 px-3 bg-amber-50 rounded-lg text-gray-700 border border-amber-200"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                            <div className="flex items-center">
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    readOnly
                                                    className="w-full py-2 px-3 bg-amber-50 rounded-lg text-gray-700 border border-amber-200"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                                                Mobile Number
                                                <span className="text-amber-500 ml-1">*</span>
                                            </label>
                                            <div className="relative flex items-center">
                                                <div className="absolute left-3 text-gray-500">+91</div>
                                                <input
                                                    type="tel"
                                                    name="mobileNumber"
                                                    value={formData.mobileNumber}
                                                    onChange={handleInputChange}
                                                    pattern="[0-9]{10}"
                                                    className={`w-full py-2 px-3 pl-12 rounded-lg border ${
                                                        isEditable 
                                                            ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                            : 'bg-amber-50 border-amber-200'
                                                    }`}
                                                    placeholder="Enter mobile number"
                                                    disabled={!isEditable}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Alternate Mobile</label>
                                            <div className="relative flex items-center">
                                                <div className="absolute left-3 text-gray-500">+91</div>
                                                <input
                                                    type="tel"
                                                    name="alternateMobile"
                                                    value={formData.alternateMobile}
                                                    onChange={handleInputChange}
                                                    pattern="[0-9]{10}"
                                                    className={`w-full py-2 px-3 pl-12 rounded-lg border ${
                                                        isEditable 
                                                            ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                            : 'bg-amber-50 border-amber-200'
                                                    }`}
                                                    disabled={!isEditable}
                                                />
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
                                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                                                Location
                                                <span className="text-amber-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className={`w-full py-2 px-3 rounded-lg border ${
                                                    isEditable 
                                                        ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                        : 'bg-amber-50 border-amber-200'
                                                }`}
                                                disabled={!isEditable}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                                                Farm Name
                                                <span className="text-amber-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="hostelName"
                                                value={formData.hostelName}
                                                onChange={handleInputChange}
                                                className={`w-full py-2 px-3 rounded-lg border ${
                                                    isEditable 
                                                        ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                        : 'bg-amber-50 border-amber-200'
                                                }`}
                                                disabled={!isEditable}
                                            />
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
                                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                                                Experience (Years)
                                                <span className="text-amber-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                className={`w-full py-2 px-3 rounded-lg border ${
                                                    isEditable 
                                                        ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                        : 'bg-amber-50 border-amber-200'
                                                }`}
                                                disabled={!isEditable}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                                                Farming Area (Acres)
                                                <span className="text-amber-500 ml-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="farmingArea"
                                                value={formData.farmingArea}
                                                onChange={handleInputChange}
                                                className={`w-full py-2 px-3 rounded-lg border ${
                                                    isEditable 
                                                        ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                        : 'bg-amber-50 border-amber-200'
                                                }`}
                                                disabled={!isEditable}
                                            />
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
                                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                                            About Your Farm
                                            <span className="text-amber-500 ml-1">*</span>
                                        </label>
                                        <textarea
                                            name="permanentAddress"
                                            value={formData.permanentAddress}
                                            onChange={handleInputChange}
                                            className={`w-full py-2 px-3 rounded-lg border ${
                                                isEditable 
                                                    ? 'bg-white border-amber-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-500' 
                                                    : 'bg-amber-50 border-amber-200'
                                            }`}
                                            rows="4"
                                            disabled={!isEditable}
                                            placeholder="Describe your farm, crops, livestock, etc."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {isEditable ? (
                                <>
                                    <button
                                        onClick={toggleEdit}
                                        className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-medium rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg shadow hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={toggleEdit}
                                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg shadow hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;