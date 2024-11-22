import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoTop from "./../assets/logo.jpeg";
import { useAuth } from "../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BsBoxArrowLeft } from "react-icons/bs";

const superAdminMenuItems = [
  { title: "Dashboard", path: "/", icon: <MdDashboard className="text-xl" /> },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgProfile className="text-xl" />,
  },
];

const superUserMenuItems = [
  { title: "Dashboard", path: "/", icon: <MdDashboard className="text-xl" /> },
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
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems =
    role === "superadmin"
      ? superAdminMenuItems
      : role === "superuser"
      ? superUserMenuItems
      : userMenuItems;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    sessionStorage.removeItem("token");
    navigate("/login");
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="w-full h-screen bg-primary dark:bg-gray-800 text-white flex flex-col px-6">
        <div className="pt-4 w-full pl-10">
          <img
            src={logoTop}
            alt="Top Logo"
            className="w-16 h-16 rounded-lg mb-3"
          />
        </div>
        <nav className="flex justify-between flex-col h-full w-full mt-20">
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 rounded-md py-2 text-sm hover:bg-secondary dark:hover:bg-gray-700 transition duration-150 ease-in-out tracking-widest ${
                    location.pathname === item.path
                      ? "bg-secondary dark:bg-gray-700"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-full mb-7">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm hover:text-red-400 transition duration-150 ease-in-out tracking-widest"
            >
              <BsBoxArrowLeft />
              Logout
            </button>
          </div>
        </nav>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              confirmLogout();
            }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                autoFocus
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Sidebar;
