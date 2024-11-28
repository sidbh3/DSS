import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaUsers } from 'react-icons/fa';

const RoleManagement = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link
        to="/new-role"
        className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center gap-2 transition-all duration-300 ease-in-out"
      >
        <FaPlus className="w-4 h-4" />
        <span>Create New User</span>
      </Link>
     
      <Link
        to="/existing-role"
        className="bg-background text-primary border border-primary hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-md inline-flex items-center gap-2 transition-all duration-300 ease-in-out"
      >
        <FaUsers className="w-4 h-4" />
        <span>Existing Users</span>
      </Link>
    </div>
  );
};

export default RoleManagement;
