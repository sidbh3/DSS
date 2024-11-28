import React, { useState } from "react";
import { Modal } from "../../../components/Common/Modal";

function NewUser() {
  // State declarations
  const [showModal, setShowModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    empId: "",
    designation: "",
    category: "",
    airCommand: "",
    activationDate: "",
    identityProof: null,
    permissions: [],
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Options arrays
  const permissionOptions = ["Admin", "User", "Manager", "Viewer"];
  const airCommandOptions = ["North", "South", "East", "West", "Central"];
  const designationOptions = ["Officer", "Airman", "Civilian", "Contractor"];
  const categoryOptions = ["Regular", "Contract", "Temporary", "Permanent"];

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.empId.trim()) newErrors.empId = "Employee ID is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.airCommand) newErrors.airCommand = "Air Command is required";
    if (!formData.activationDate)
      newErrors.activationDate = "Activation date is required";
    if (formData.permissions.length === 0)
      newErrors.permissions = "At least one permission is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        identityProof: file,
      }));
    }
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const updatedPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission];

      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
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
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      empId: "",
      designation: "",
      category: "",
      airCommand: "",
      activationDate: "",
      identityProof: null,
      permissions: [],
    });
    setErrors({});
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          User Management Portal
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
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="empId"
                    value={formData.empId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.empId ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.empId && (
                    <p className="text-red-500 text-xs mt-1">{errors.empId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Designation
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.designation ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  >
                    <option value="">Select Designation</option>
                    {designationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.designation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.designation}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

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
              </div>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">
                    Activation Date
                  </label>
                  <input
                    type="date"
                    name="activationDate"
                    value={formData.activationDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full bg-white dark:bg-gray-700 border ${
                      errors.activationDate
                        ? "border-red-500"
                        : "border-gray-300"
                    } dark:border-gray-600 p-3 rounded-lg`}
                  />
                  {errors.activationDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activationDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-2">
                  Permissions
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {permissionOptions.map((permission) => (
                    <label
                      key={permission}
                      className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionToggle(permission)}
                        className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {permission}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.permissions && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.permissions}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label className="text-gray-700 dark:text-gray-300 text-sm block mb-2">
                  Identity Proof
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Upload valid government ID proof (PDF or Image)
                </p>
              </div>

              <div className="flex justify-end gap-4">
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
                  {previewMode ? "Edit" : "Preview"}
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
              {Object.entries(formData).map(
                ([key, value]) =>
                  key !== "identityProof" && (
                    <div
                      key={key}
                      className="grid grid-cols-2 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                    >
                      <span className="text-gray-600 dark:text-gray-400 capitalize">
                        {key}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {Array.isArray(value) ? value.join(", ") : value || "-"}
                      </span>
                    </div>
                  )
              )}
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
            <p className="text-xl mb-4">User Created Successfully</p>
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

export default NewUser;
