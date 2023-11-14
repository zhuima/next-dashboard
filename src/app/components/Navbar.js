"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import CMDBLogo from "@/app/ui/cmdb-logo";

const SubMenu = ({ items, isActive }) => {
  return (
    <div className="flex flex-col pl-4">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`block px-4 py-2 text-sm hover:bg-blue-700 ${
            isActive(item.href) ? "bg-blue-700 text-white" : "text-gray-200"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

// Assuming NavbarItem is defined as follows
const NavbarItem = ({ title, href, subItems, isOpen, onClick }) => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  console.log("active ----> ", pathname, href);
  const itemClass = isActive(href)
    ? "bg-blue-700 text-white" // Active item class
    : "text-gray-300 hover:bg-blue-600 hover:text-white"; // Inactive item class

  // If there are subItems, render a button that can toggle the submenu
  // If there are no subItems, render a link for navigation
  return subItems && subItems.length > 0 ? (
    <div className="relative">
      <button
        onClick={onClick}
        className={`flex items-center  justify-between w-full px-4 py-2 text-sm text-white font-semibold rounded hover:bg-blue-700 ${itemClass}`}
      >
        {title}
        <span>{isOpen ? <AiOutlineUp /> : <AiOutlineDown />}</span>
      </button>
      {isOpen && <SubMenu items={subItems} isActive={isActive} />}
    </div>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2 text-sm text-white font-semibold rounded hover:bg-blue-700 ${itemClass}`}
    >
      {title}
    </Link>
  );
};

const Navbar = ({ isMenuOpen }) => {
  const [openItem, setOpenItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (menuTitle) => {
    if (openMenu === menuTitle) {
      setOpenMenu(null);
      setOpenItem(null);
    } else {
      setOpenMenu(menuTitle);
      setOpenItem(menuTitle);
    }
  };

  const sidebarWidthClass = isMenuOpen ? "w-60" : "w-40";

  return (
    <nav
      className={`${sidebarWidthClass} transition-all duration-300  bg-blue-900 text-white`}
    >
      <div className="flex justify-center items-center py-4">
        {/* Logo placeholder */}
        <Link href="/dashboard">
          <CMDBLogo />
        </Link>
      </div>
      <div className="mt-10 flex flex-col">
        <NavbarItem
          title="首页"
          href="/dashboard"
          onClick={() => handleMenuClick("首页")}
        />
        <NavbarItem
          title="invoices"
          isOpen={openMenu === "invoices"}
          onClick={() => handleMenuClick("invoices")}
          subItems={[
            { title: "Table", href: "/dashboard/invoices" },
            { title: "Submenu 1-2", href: "/dashboard/invoices/sub2" },
          ]}
        />
        <NavbarItem
          title="Menu 2"
          isOpen={openMenu === "Menu 2"}
          onClick={() => handleMenuClick("Menu 2")}
          subItems={[
            { title: "Submenu 2-1", href: "/dashboard/menu2/sub1" },
            { title: "Submenu 2-2", href: "/dashboard/menu2/sub2" },
          ]}
        />
        <NavbarItem
          title="Menu 3"
          isOpen={openMenu === "Menu 3"}
          onClick={() => handleMenuClick("Menu 3")}
          subItems={[
            { title: "Submenu 3-1", href: "/dashboard/menu3/sub1" },
            { title: "Submenu 3-2", href: "/dashboard/menu3/sub2" },
          ]}
        />

        <NavbarItem
          title="值班信息"
          href="/dashboard/dutyschedule"
          onClick={() => handleMenuClick("值班信息")}
        />
        {/* ...other menu items */}
      </div>
    </nav>
  );
};

export default Navbar;
