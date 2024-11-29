import React, { useState } from "react";
import { Modal } from "../../../components/Common/Modal";

function NewRole() {
  const [showModal, setShowModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    roleName: "",
    roleDescription: "",
    userType: "",
    airCommand: "",
    taskList: "",
    userScopeCommand: "",
  });

  const [errors, setErrors] = useState({});

  const airCommandOptions = ["North", "South", "East", "West", "Central"];
  const taskListOptions = ["View", "Edit", "Create"];
  const userTypeOptions = ["Admin", "Normal User", "Super User"];
  const userScopeCommandOptions = ["Command 1", "Command 2", "Command 3"];

  // Form validation and handlers remain the same
  const validateForm = () => {
    const newErrors = {};
    if (!formData.roleName.trim()) newErrors.roleName = "Role name is required";
    if (!formData.roleDescription.trim())
      newErrors.roleDescription = "Role description is required";
    if (!formData.userType) newErrors.userType = "User type is required";
    if (formData.airCommand.length === 0)
      newErrors.airCommand = "At least one Air Command is required";
    if (formData.taskList.length === 0)
      newErrors.taskList = "At least one Task is required";
    if (formData.userScopeCommand.length === 0)
      newErrors.userScopeCommand =
        "At least one User Scope Command is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropdownChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const togglePreview = () => {
    if (!previewMode && !validateForm()) return;
    setPreviewMode(!previewMode);
  };

  const resetForm = () => {
    setFormData({
      roleName: "",
      roleDescription: "",
      userType: "",
      airCommand: [],
      taskList: [],
      userScopeCommand: [],
    });
    setErrors({});
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          New Role Management
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-4">
            Indian Air Force
          </span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {!previewMode ? (
            <>
              {/* First Row - Basic Information */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Role Name */}
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Role Name
                  </label>
                  <input
                    type="text"
                    name="roleName"
                    value={formData.roleName}
                    onChange={handleInputChange}
                    placeholder="Enter role name"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.roleName ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.roleName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.roleName}
                    </p>
                  )}
                </div>

                {/* Role Description */}
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Role Description
                  </label>
                  <input
                    type="text"
                    name="roleDescription"
                    value={formData.roleDescription}
                    onChange={handleInputChange}
                    placeholder="Enter role description"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.roleDescription
                        ? "border-red-500"
                        : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.roleDescription && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.roleDescription}
                    </p>
                  )}
                </div>

                {/* User Type */}
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    User Type
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.userType ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  >
                    <option value="">Select User Type</option>
                    {userTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.userType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.userType}
                    </p>
                  )}
                </div>
              </div>

              {/* Second Row - Dropdowns */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Air Command Dropdown */}
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Air Command
                  </label>
                  <select
                    name="airCommand"
                    value={formData.airCommand}
                    onChange={handleInputChange}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.airCommand ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  >
                    <option value="">Select Air Command</option>
                    {airCommandOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.airCommand && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.airCommand}
                    </p>
                  )}
                </div>
                {/* User Scope Command Dropdown */}
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    User Scope
                  </label>
                  <select
                    name="userScopeCommand"
                    value={formData.userScopeCommand}
                    onChange={handleInputChange}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.userScopeCommand
                        ? "border-red-500"
                        : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  >
                    <option value="">Select User Scope</option>
                    {userScopeCommandOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.userScopeCommand && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.userScopeCommand}
                    </p>
                  )}
                </div>
                {/* Task List Dropdown */}
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Role Action
                  </label>
                  <select
                    name="taskList"
                    value={formData.taskList}
                    onChange={handleInputChange}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.taskList ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  >
                    <option value="">Select Task</option>
                    {taskListOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.taskList && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.taskList}
                    </p>
                  )}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-36">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={togglePreview}
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Preview Information</h2>
              {Object.entries(formData).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-2 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                >
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {Array.isArray(value) ? value.join(", ") : value || "-"}
                  </span>
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  onClick={togglePreview}
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </form>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Success"
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-green-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xl mb-4">Role Created Successfully</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default NewRole;
