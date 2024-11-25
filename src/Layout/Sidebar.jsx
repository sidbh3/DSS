import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoTop from "./../assets/logo.jpeg";
import { useAuth } from "../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BsBoxArrowLeft } from "react-icons/bs";
import {
  FaChartBar,
  FaFileAlt,
  FaHome,
  FaMap,
  FaStar,
  FaTasks,
  FaUpload,
} from "react-icons/fa";
import { FaChartPie, FaHeadset, FaUsers } from "react-icons/fa6";

const superAdminMenuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaHome className="text-xl" />,
  },
  {
    title: "Content Management",
    path: "/content-management",
    icon: <FaTasks className="text-xl" />,
  },
  {
    title: "Data Analysis",
    path: "/data-analysis",
    icon: <FaChartPie className="text-xl" />,
  },
  {
    title: "Role Management",
    path: "/role-management",
    icon: <FaUsers className="text-xl" />,
  },
  {
    title: "User Management",
    path: "/user-management",
    icon: <FaUsers className="text-xl" />,
  },
  {
    title: "Support & Inquiries",
    path: "/support-inquiries",
    icon: <FaHeadset className="text-xl" />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgProfile className="text-xl" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoMdSettings className="text-xl" />,
  },
];

const superUserMenuItems = [
  { title: "Dashboard", path: "/", icon: <FaHome className="text-xl" /> },
  {
    title: "Upload Documents",
    path: "/upload-documents",
    icon: <FaUpload className="text-xl" />,
  },
  {
    title: "View Documents",
    path: "/view-documents",
    icon: <FaFileAlt className="text-xl" />,
  },
  {
    title: "Upload Symbols",
    path: "/upload-symbols",
    icon: <FaUpload className="text-xl" />,
  },
  {
    title: "View Symbols",
    path: "/view-symbols",
    icon: <FaFileAlt className="text-xl" />,
  },
  { title: "Starred", path: "/starred", icon: <FaStar className="text-xl" /> },
  {
    title: "Generate Report",
    path: "/generate-report",
    icon: <FaChartBar className="text-xl" />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgProfile className="text-xl" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoMdSettings className="text-xl" />,
  },
];

const userMenuItems = [
  { title: "Dashboard", path: "/", icon: <MdDashboard className="text-xl" /> },
  { title: "Map", path: "/map", icon: <FaMap className="text-xl" /> },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgProfile className="text-xl" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoMdSettings className="text-xl" />,
  },
];

function Sidebar() {
  // const { role } = useAuth();
  const role = "";
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems =
    role === "superadmin"
      ? superAdminMenuItems
      : role === "superuser"
      ? superUserMenuItems
      : userMenuItems;

  return (
    <div className="w-full h-screen bg-[#F4F4F4] dark:bg-background text-secondary-foreground dark:text-white flex flex-col px-2 border-r dark:border-gray-800">
      <div className="pt-4 w-full pl-10">
        <img
          src={logoTop}
          alt="Top Logo"
          className="w-16 h-16 rounded-lg mb-3 border-2 border-gray-200 dark:border-gray-700"
        />
      </div>

      <nav className="flex justify-between flex-col h-full w-full mt-20">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 rounded-md py-2 text-sm hover:bg-secondary dark:hover:bg-gray-800 transition duration-150 ease-in-out tracking-widest ${
                  location.pathname === item.path
                    ? "bg-secondary dark:bg-gray-800"
                    : ""
                }`}
              >
                <span className="text-secondary-foreground dark:text-gray-200">
                  {item.icon}
                </span>
                <span className="text-secondary-foreground dark:text-gray-200">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-full mb-7 px-3">
          <Link to="/logout">
            <button className="flex items-center gap-2 text-[16px] tracking-widest group text-secondary-foreground dark:text-gray-200 hover:text-gray-700 dark:hover:text-white">
              <BsBoxArrowLeft className="text-xl group-hover:-translate-x-2 transition duration-300 ease-in-out" />
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
