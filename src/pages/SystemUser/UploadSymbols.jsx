import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadSymbols() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    documentFormat: "",
    documentType: "",
    name: "",
    documentDate: "",
    origin: "",
    meta: "",
    description: "",
    truthScore: "",
    category: "softcopy",
    file: null,
    classification: "unclassified",
  });

  const imageFormats = [
    "JPEG",
    "PNG",
    "JPG",
    "Bitmap",
  ];

  const documentTypes = ["Input","Output"];

  const classificationTypes = [
    "Unclassified",
    "Restricted",
    "Confidential",
    "Secret",
    "Top Secret",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.documentFormat)
      newErrors.documentFormat = "Please select a image format";
    if (!formData.documentType)
      newErrors.documentType = "Please select a purpose";
    if (!formData.name.trim()) newErrors.name = "Image name is required";
    if (!formData.documentDate) newErrors.documentDate = "Please select a date";
    if (!formData.origin.trim()) newErrors.origin = "Origin is required";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!formData.truthScore) {
      newErrors.truthScore = "Truth score is required";
    } else if (formData.truthScore < 1 || formData.truthScore > 10) {
      newErrors.truthScore = "Truth score must be between 1 and 10";
    }
    if (!formData.file) {
      newErrors.file = "Please upload a document";
    } else {
      const fileSize = formData.file.size / 1024 / 1024;
      if (fileSize > 10) newErrors.file = "File size should not exceed 10MB";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (!validTypes.includes(fileType)) {
        toast.error("Invalid file format");
        return;
      }

      setFormData((prev) => ({ ...prev, file }));
      if (errors.file) setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowModal(true);
        toast.success("Document uploaded successfully!");
        handleReset();
      } catch (error) {
        toast.error("Upload failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      documentFormat: "",
      documentType: "",
      name: "",
      documentDate: "",
      origin: "",
      meta: "",
      description: "",
      truthScore: "",
      category: "softcopy",
      file: null,
      classification: "unclassified",
    });
    setErrors({});
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-secondary-foreground tracking-widest flex items-center">
        <svg
          className="w-6 h-6 mr-3 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        Symbol Upload Portal
        <span className="ml-4 text-sm text-gray-500">IAF-DSS</span>
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Document Format and Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Image Type Format
              </label>
              <select
                name="documentFormat"
                value={formData.documentFormat}
                onChange={handleInputChange}
                className={`w-full rounded-lg border ${
                  errors.documentFormat ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Format</option>
                {imageFormats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
              {errors.documentFormat && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.documentFormat}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Purpose
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleInputChange}
                className={`w-full rounded-lg border ${
                  errors.documentType ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Type</option>
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.documentType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.documentType}
                </p>
              )}
            </div>
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Image Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Date */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Image Date
              </label>
              <input
                type="date"
                name="documentDate"
                value={formData.documentDate}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full rounded-lg border ${
                  errors.documentDate ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.documentDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.documentDate}
                </p>
              )}
            </div>

            {/* Origin */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Origin
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className={`w-full rounded-lg border ${
                  errors.origin ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.origin && (
                <p className="mt-1 text-sm text-red-500">{errors.origin}</p>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Meta Tags */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Meta Tags
              </label>
              <input
                type="text"
                name="meta"
                value={formData.meta}
                onChange={handleInputChange}
                placeholder="Separate tags with commas"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className={`w-full rounded-lg border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Truth Score */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Truth Score (1-10)
              </label>
              <input
                type="number"
                name="truthScore"
                min="1"
                max="10"
                value={formData.truthScore}
                onChange={handleInputChange}
                className={`w-full rounded-lg border ${
                  errors.truthScore ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.truthScore && (
                <p className="mt-1 text-sm text-red-500">{errors.truthScore}</p>
              )}
            </div>
          </div>

          {/* Classification and File Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Classification */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Classification Level
              </label>
              <select
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {classificationTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                Upload Document
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                className={`w-full rounded-lg border ${
                  errors.file ? "border-red-500" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.file && (
                <p className="mt-1 text-sm text-red-500">{errors.file}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Max file size: 10MB. Supported formats: PDF, Word, Excel,
                PowerPoint
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </form>
      </div>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Upload Successful</h2>
            <p>Your document has been uploaded successfully.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UploadSymbols;
