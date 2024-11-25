import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-[81vh]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          confirmLogout();
        }}
        className="rounded-lg p-6 w-96 shadow-2xl shadow-black/50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Confirm Logout
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Cancel
            </button>
          </Link>
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
  );
}

export default Logout;
