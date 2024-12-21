"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Heart,
  Lightbulb,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = ({ setCurrentView, currentView, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="relative">
      <button
        className="fixed left-0 top-3 z-50 rounded-full bg-white p-3 shadow-lg transition-transform duration-300 hover:rotate-180 hover:scale-110 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 z-40 h-full bg-gradient-to-b from-white to-green-50 shadow-xl transition-all duration-500 ease-in-out ${
          isOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-center border-b border-green-100 bg-white/50 backdrop-blur-sm">
          <div className="ml-4 flex items-center space-x-3 md:ml-0">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image
                alt="logo"
                src="https://media.discordapp.net/attachments/1316344599983292418/1316456172785635338/removebg.png?ex=675bc59a&is=675a741a&hm=9c54919d21fc0d76efd10b155f697bf3e205dca36ffe4d005f1ac89cab7c128c&=&format=webp&quality=lossless"
                width={48}
                height={48}
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h1 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-xl font-bold tracking-wide text-transparent">
              SwasthyaMeter
            </h1>
          </div>
        </div>

        <nav className="mt-6 flex h-[calc(100%-6rem)] flex-col p-4">
          <div className="flex-1 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setCurrentView(item.title)}
                className={`group relative my-4 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-gray-700 transition-all duration-300 hover:pl-6 ${
                  currentView === item.title
                    ? "bg-green-400/80 text-white shadow-lg"
                    : "hover:bg-green-100"
                }`}
              >
                <div className="relative flex items-center gap-3">
                  <div
                    className={`transition-transform duration-300 ${
                      hoveredItem === item.title ? "scale-110" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`font-medium ${
                      currentView === item.title
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                {currentView === item.title && (
                  <div className="absolute -left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-green-600" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-red-600 transition-all duration-300 hover:bg-red-50 hover:pl-6"
          >
            <LogOut
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
