import React, { useState } from "react";
import { User, Mail, Camera } from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    bio: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfileImage(upload.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <User size={28} className="text-blue-600" />
          My Profile
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-52 h-52 rounded-full object-cover border-4 border-blue-100 group-hover:brightness-75 transition-all"
          />
          <label 
            htmlFor="imageUpload" 
            className="
              absolute inset-0 flex items-center justify-center 
              bg-black bg-opacity-0 group-hover:bg-opacity-40 
              rounded-full cursor-pointer transition-all
              opacity-0 group-hover:opacity-100
            "
          >
            <Camera 
              size={40} 
              className="text-white opacity-0 group-hover:opacity-80 transition-all" 
            />
            <input 
              type="file" 
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <form className="w-full space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input 
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="
                  w-full px-3 py-2 border border-gray-300 
                  rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-blue-500 transition-all
                "
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="
                  w-full px-3 py-2 border border-gray-300 
                  rounded-lg focus:outline-none focus:ring-2 
                  focus:ring-blue-500 transition-all
                "
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="bio" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bio
            </label>
            <textarea 
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="Tell us a bit about yourself"
              rows={4}
              className="
                w-full px-3 py-2 border border-gray-300 
                rounded-lg focus:outline-none focus:ring-2 
                focus:ring-blue-500 transition-all
              "
            />
          </div>

          <div>
            <label 
              htmlFor="location" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input 
              type="text"
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              placeholder="Your current city"
              className="
                w-full px-3 py-2 border border-gray-300 
                rounded-lg focus:outline-none focus:ring-2 
                focus:ring-blue-500 transition-all
              "
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="
                bg-blue-600 text-white 
                px-6 py-2.5 rounded-lg 
                hover:bg-blue-700 
                transition-all 
                flex items-center gap-2
              "
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;