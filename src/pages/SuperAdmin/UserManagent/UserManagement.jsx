import React from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link 
        to="/new-user"
        className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
      >
        Create New User
      </Link>
      
      <Link
        to="/existing-user"
        className="bg-background text-primary border border-primary hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
      >
        Existing Users
      </Link>
    </div>
  );
};

export default UserManagement;
