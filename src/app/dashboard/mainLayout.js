"use client";
import { useState } from "react";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import UserBar from "../components/UserBar";
import Image from "next/image";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log("Sidebar toggled", isSidebarOpen); // Log for debugging
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Navbar isMenuOpen={isSidebarOpen} />
      <div className="flex flex-col flex-grow">
        <UserBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Content>
          {/* Other components or content can go here */}
          {children}
        </Content>
      </div>
    </div>
  );
}
