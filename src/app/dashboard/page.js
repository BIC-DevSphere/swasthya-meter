"use client";
import React, { useState } from "react";
import {
  Bell,
  Search,
  User,
  LayoutDashboard,
  FileText,
  Heart,
  Lightbulb,
  HeartPulse,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import Reports from "@/components/dashboard/Reports";
import Link from "next/link";
import MyHealth from "@/components/dashboard/MyHealth";
import { IconMedicineSyrup } from "@tabler/icons-react";
import MedicineReminder from "@/components/dashboard/MedicineReminder";
const Page = () => {
  const [currentView, setCurrentView] = useState("Dashboard");
  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Report", icon: <FileText size={20} /> },
    { title: "My Health", icon: <HeartPulse size={20} /> },
    { title: "Medicine Reminder", icon: <IconMedicineSyrup size={26} /> },
  ];
  const renderContent = () => {
    switch (currentView) {
      case "Dashboard":
        return <Dashboard />;
      case "My Health":
        return <MyHealth />;
      case "Report":
        return <Reports />;
      case "Medicine Reminder":
        return <MedicineReminder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        menuItems={menuItems}
      />
      <div className="ml-0 flex-1 md:ml-72">
        <div className="fixed left-0 right-0 top-0 z-30 h-20 border-b bg-white md:left-72">
          <div className="flex h-full items-center justify-end px-4">
            <div className="flex items-center gap-4">
              <div className="hidden items-center rounded-lg bg-gray-100 px-3 py-2 md:flex">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 border-none bg-transparent px-2 outline-none"
                />
              </div>

              <button className="relative rounded-lg p-2 hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <Link href="/profile">
                <button className="rounded-lg p-2 hover:bg-gray-100">
                  <User size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-6 pt-24">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Page;
