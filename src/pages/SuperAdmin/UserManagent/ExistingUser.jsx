import React from 'react';
import Table1 from '../../../components/Common/Tables/Table1';

function ExistingUser() {
  const userData = [
    {
      empId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      empId: 'EMP002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    },
    {
      empId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      empId: 'EMP002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    },
    {
      empId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      empId: 'EMP002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    },
    {
      empId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      empId: 'EMP002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    },
    {
      empId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    {
      empId: 'EMP002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com'
    }
  ];

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleView = (user) => {
    console.log('View user:', user);
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          Existing Users
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-4">
            Indian Air Force
          </span>
        </h1>

        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <Table1
            data={userData}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default ExistingUser;
