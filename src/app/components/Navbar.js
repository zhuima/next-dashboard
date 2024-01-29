"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AiOutlineDown,
  AiOutlineUp,
  AiFillHome,
  AiOutlineSchedule,
  AiOutlineFieldTime,
  AiOutlineTable,
  AiOutlineUser,
} from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { VscServerProcess } from "react-icons/vsc";
import { TiTicket } from "react-icons/ti";

import { LiaStampSolid } from "react-icons/lia";

import CMDBLogo from "@/app/ui/cmdb-logo";

const SubMenu = ({ items, isActive }) => {
  return (
    <div className="flex flex-col pl-4">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`flex items-center px-4 py-2 text-sm hover:bg-blue-700 ${isActive(item.href) ? "bg-blue-700 text-white" : "text-gray-200"
            }`}
          prefetch
        >
          {item.Icon && <item.Icon className="mr-2" />} {/* Display icon */}
          {item.title}
        </Link>
      ))}
    </div>
  );
};

// Assuming NavbarItem is defined as follows
const NavbarItem = ({ title, href, subItems, isOpen, onClick, Icon }) => {
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
        className={`flex items-center justify-between w-full px-4 py-2 text-sm text-white font-semibold rounded  hover:bg-blue-700  ${itemClass}`}
      >
        <div className="flex items-center">
          {Icon && <Icon className="mr-2" />} {/* Icon for the navbar item */}
          {title}
        </div>
        {subItems && subItems.length > 0 && (
          <span>{isOpen ? <AiOutlineUp /> : <AiOutlineDown />}</span>
        )}
      </button>
      {isOpen && <SubMenu items={subItems} isActive={isActive} />}
    </div>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm text-white font-semibold rounded  hover:bg-blue-700 ${itemClass}`}
      prefetch
    >
      {Icon && <Icon className="mr-2 flex-shrink-0" />}{" "}
      {/* Prevent icon from shrinking */}
      <span className="flex-grow">{title}</span>{" "}
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
    <div className="flex flex-row">
      <nav
        className={`${sidebarWidthClass} bg-blue-900 text-white`}
      >
        <div className="flex justify-center items-center py-4 mt-3">
          {/* Logo placeholder */}
          <Link href="/dashboard" prefetch>
            {/* <CMDBLogo /> */}
            <h1>DevOps</h1>
          </Link>
        </div>
        <div className="mt-3 flex flex-col">
          <NavbarItem
            title="首页"
            href="/dashboard"
            Icon={AiFillHome}
            onClick={() => handleMenuClick("首页")}
          />
          <NavbarItem
            title="项目列表"
            href="/dashboard/project/tree"
            Icon={GrProjects}
            onClick={() => handleMenuClick("项目列表")}
          />
          {/* <NavbarItem
            title="invoices"
            isOpen={openMenu === "invoices"}
            onClick={() => handleMenuClick("invoices")}
            Icon={AiFillHome}
            subItems={[
              {
                title: "Table",
                href: "/dashboard/invoices",
                Icon: AiOutlineTable,
              },
              {
                title: "Submenu 1-2",
                href: "/dashboard/invoices/sub2",
                Icon: AiFillHome,
              },
            ]}
          /> */}
          {/* <NavbarItem
            title="项目信息"
            isOpen={openMenu === "项目信息"}
            onClick={() => handleMenuClick("项目信息")}
            Icon={AiOutlineTable}
            subItems={[
              { title: "项目列表", Icon: AiOutlineTable, href: "/dashboard/project/tree" },
              { title: "Submenu 2-2", Icon: AiFillHome, href: "/dashboard/menu2/sub2" },
            ]}
          /> */}
          <NavbarItem
            title="审批管理"
            isOpen={openMenu === "审批管理"}
            Icon={LiaStampSolid}
            onClick={() => handleMenuClick("审批管理")}
            subItems={[
              {
                title: "发起审批",
                Icon: LiaStampSolid,
                href: "/dashboard/approval/new",
              },
              {
                title: "我发起的",
                Icon: LiaStampSolid,
                href: "/dashboard/approval/my",
              },
              {
                title: "我审批的",
                Icon: LiaStampSolid,
                href: "/dashboard/approval/assign-me",
              },
              {
                title: "所有审批",
                Icon: LiaStampSolid,
                href: "/dashboard/approval/base",
              },
            ]}
          />

          <NavbarItem
            title="资源管理"
            isOpen={openMenu === "资源管理"}
            Icon={VscServerProcess}
            onClick={() => handleMenuClick("资源管理")}
            subItems={[
              {
                title: "主机管理",
                Icon: VscServerProcess,
                href: "/dashboard/assets/hosts",
              },
              {
                title: "域名管理",
                Icon: VscServerProcess,
                href: "/dashboard/assets/domains",
              },
              {
                title: "小程序管理",
                Icon: VscServerProcess,
                href: "/dashboard/assets/miniprograms",
              },
              {
                title: "公众号管理",
                Icon: VscServerProcess,
                href: "/dashboard/assets/officialaccount",
              },
            ]}
          />

          <NavbarItem
            title="工单待办"
            href="/dashboard/workflow"
            Icon={TiTicket}
            onClick={() => handleMenuClick("工单待办")}
          />

          <NavbarItem
            title="值班信息"
            href="/dashboard/dutyschedule"
            Icon={AiOutlineSchedule}
            onClick={() => handleMenuClick("值班信息")}
          />
          <NavbarItem
            title="定时任务"
            href="/dashboard/tasks"
            Icon={AiOutlineFieldTime}
            onClick={() => handleMenuClick("定时任务")}
          />

          <NavbarItem
            title="系统设置"
            isOpen={openMenu === "系统设置"}
            Icon={AiOutlineUser}
            onClick={() => handleMenuClick("系统设置")}
            subItems={[
              {
                title: "用户管理",
                Icon: AiOutlineUser,
                href: "/dashboard/settings/user",
              },
              {
                title: "角色管理",
                Icon: AiOutlineSchedule,
                href: "/dashboard/settings/role",
              },
            ]}
          />


          {/* ...other menu items */}
        </div>
      </nav>
    </div>

  );
};

export default Navbar;
