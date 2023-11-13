/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2023-11-12 20:48:52
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2023-11-13 16:59:56
 * @FilePath: /my-next-dashboard/src/app/components/UserBar.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const UserBar = ({ toggleSidebar, isSidebarOpen }) => {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle for the theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex justify-between items-center  p-4  bg-gray-100">
      <button onClick={toggleSidebar} className="...">
        {isSidebarOpen ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
      </button>
      {/* <button
        className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-200"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button> */}
      <div className="relative">
        <button onClick={() => setDropdownOpen(!isDropdownOpen)}>追马</button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20"
          >
            <Link
              href="/login" // Replace with your logout logic
              onClick={() => {
                // Add logout logic here
                setDropdownOpen(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBar;
