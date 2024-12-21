"use client";
import React, { useState } from "react";
import { Bell, Search, User, ShieldCheck, ChevronRight } from "lucide-react";
import Profile from "@/components/profile/Profile";
import Security from "@/components/profile/Security";

// Sidebar component extracted for better modularity
const ProfileSidebar = ({ menuItems, currentView, onItemSelect }) => {
  return (
    <div className="w-64 bg-gray-50 p-6 border-r min-h-screen">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Account</h2>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => onItemSelect(item.title)}
              className={`
                flex items-center justify-between w-full p-3 rounded-lg text-left transition-all duration-200
                ${currentView === item.title 
                  ? 'bg-blue-100 text-blue-600 font-semibold' 
                  : 'hover:bg-gray-100 text-gray-600'}
              `}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <ChevronRight 
                size={16} 
                className={`
                  transition-transform duration-200
                  ${currentView === item.title ? 'rotate-90' : 'rotate-0'}
                `} 
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Page = () => {
  const [currentView, setCurrentView] = useState("Profile");
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    { title: "Profile", icon: <User size={20} /> },
    { title: "Security", icon: <ShieldCheck size={20} /> },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "Profile":
        return <Profile />;
      case "Security":
        return <Security />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <ProfileSidebar 
        menuItems={menuItems} 
        currentView={currentView} 
        onItemSelect={setCurrentView} 
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{currentView}</h1>
              <p className="text-sm text-gray-500">Welcome back, User!</p>
            </div>

            {/* Search and Notification Area */}
           
          </div>
        </header>

        {/* Content Area with Padding and Max Width */}
        <main className="px-6 py-8 max-w-4xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Page;