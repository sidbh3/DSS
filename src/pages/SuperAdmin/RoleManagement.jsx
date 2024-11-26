import React, { useState } from 'react';
import { Modal } from '../../components/Common/Modal';

function RoleManagement() {
  const [showNewUser, setShowNewUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const permissionOptions = ['Verifier', 'TruthScore', 'Analyzer', 'Reporter'];

  const handlePermissionToggle = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter(p => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          Role Management Portal
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-4">Indian Air Force</span>
        </h1>

        <div className="flex gap-6 mb-8">
          <button
            onClick={() => setShowNewUser(!showNewUser)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center"
          >
            {showNewUser ? (
              <>
                <span className="mr-2">−</span> New User
              </>
            ) : (
              <>
                <span className="mr-2">+</span> New User
              </>
            )}
          </button>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 flex items-center">
            <span className="mr-2">+</span> Existing User
          </button>
        </div>

        {showNewUser && (
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">User Category</label>
                <input
                  type="text"
                  placeholder="Enter user category"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">Designation</label>
                <input
                  type="text"
                  placeholder="Enter designation"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">Air Command</label>
                <input
                  type="text"
                  placeholder="Enter air command"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">Role Description</label>
                <textarea
                  placeholder="Enter role description"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  rows="1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 text-sm">Permissions</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    onClick={() => document.getElementById('permissionDropdown').classList.toggle('hidden')}
                  >
                    Select Permissions
                  </button>
                  <div
                    id="permissionDropdown"
                    className="absolute hidden mt-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-50"
                  >
                    {permissionOptions.map((permission) => (
                      <label key={permission} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-900 dark:text-white">
                        <input
                          type="checkbox"
                          checked={permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="mr-3 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                        />
                        {permission}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-gray-700 dark:text-gray-300 text-sm block mb-2">Identity Proof</label>
              <input
                type="file"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                accept="image/*,.pdf"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Upload valid government ID proof (PDF or Image)</p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="reset"
                className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                Submit Details
              </button>
            </div>
          </form>
        )}

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Success"
        >
          <div className="p-6 text-center bg-white dark:bg-gray-800">
            <div className="w-16 h-16 mx-auto mb-4 text-green-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl text-gray-900 dark:text-white mb-4">User Created Successfully</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The new user account has been created with the specified permissions.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default RoleManagement;
