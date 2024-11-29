// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function UploadDocuments() {
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     documentFormat: "",
//     documentType: "",
//     name: "",
//     documentDate: "",
//     origin: "",
//     meta: "",
//     description: "",
//     truthScore: "",
//     category: "softcopy",
//     file: null,
//     classification: "unclassified",
//   });

//   const documentFormats = [
//     "PDF",
//     "Microsoft Word",
//     "Microsoft Excel",
//     "Microsoft PowerPoint",
//   ];

//   const documentTypes = ["Mail", "Books", "Publication"];

//   const classificationTypes = [
//     "Unclassified",
//     "Restricted",
//     "Confidential",
//     "Secret",
//     "Top Secret",
//   ];

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.documentFormat) {
//       newErrors.documentFormat = "Please select a document format";
//     }

//     if (!formData.documentType) {
//       newErrors.documentType = "Please select a document type";
//     }

//     if (!formData.name.trim()) {
//       newErrors.name = "Document name is required";
//     }

//     if (!formData.documentDate) {
//       newErrors.documentDate = "Please select a date";
//     }

//     if (!formData.origin.trim()) {
//       newErrors.origin = "Origin is required";
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required";
//     } else if (formData.description.length < 10) {
//       newErrors.description = "Description must be at least 10 characters";
//     }

//     if (!formData.truthScore) {
//       newErrors.truthScore = "Truth score is required";
//     } else if (formData.truthScore < 1 || formData.truthScore > 10) {
//       newErrors.truthScore = "Truth score must be between 1 and 10";
//     }

//     if (!formData.file) {
//       newErrors.file = "Please upload a document";
//     } else {
//       const fileSize = formData.file.size / 1024 / 1024; // Convert to MB
//       if (fileSize > 10) {
//         newErrors.file = "File size should not exceed 10MB";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileType = file.type;
//       const validTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "application/vnd.ms-powerpoint",
//         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//       ];

//       if (!validTypes.includes(fileType)) {
//         toast.error("Invalid file format");
//         return;
//       }

//       setFormData((prev) => ({ ...prev, file }));
//       if (errors.file) {
//         setErrors((prev) => ({ ...prev, file: "" }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);
//       try {
//         // Simulating API call
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         setShowModal(true);
//         toast.success("Document uploaded successfully!");
//         handleReset();
//       } catch (error) {
//         toast.error("Upload failed. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       documentFormat: "",
//       documentType: "",
//       name: "",
//       documentDate: "",
//       origin: "",
//       meta: "",
//       description: "",
//       truthScore: "",
//       category: "softcopy",
//       file: null,
//       classification: "unclassified",
//     });
//     setErrors({});
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
//           <div className="flex items-center justify-between mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
//               <svg
//                 className="w-8 h-8 mr-3 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                 />
//               </svg>
//               Document Upload Portal
//             </h1>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               IAF-DSS
//             </span>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Document Format and Type Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Document Format *
//                 </label>
//                 <select
//                   name="documentFormat"
//                   value={formData.documentFormat}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-lg border ${
//                     errors.documentFormat ? "border-red-500" : "border-gray-300"
//                   } bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 >
//                   <option value="">Select Format</option>
//                   {documentFormats.map((format) => (
//                     <option key={format} value={format}>
//                       {format}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.documentFormat && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.documentFormat}
//                   </p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Document Type *
//                 </label>
//                 <select
//                   name="documentType"
//                   value={formData.documentType}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-lg border ${
//                     errors.documentType ? "border-red-500" : "border-gray-300"
//                   } bg-white px-4 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 >
//                   <option value="">Select Type</option>
//                   {documentTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.documentType && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.documentType}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Document Details */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Document Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-lg border ${
//                     errors.name ? "border-red-500" : "border-gray-300"
//                   } px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-500">{errors.name}</p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Document Date *
//                 </label>
//                 <input
//                   type="date"
//                   name="documentDate"
//                   value={formData.documentDate}
//                   onChange={handleInputChange}
//                   max={new Date().toISOString().split("T")[0]}
//                   className={`w-full rounded-lg border ${
//                     errors.documentDate ? "border-red-500" : "border-gray-300"
//                   } px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.documentDate && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.documentDate}
//                   </p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Origin *
//                 </label>
//                 <input
//                   type="text"
//                   name="origin"
//                   value={formData.origin}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-lg border ${
//                     errors.origin ? "border-red-500" : "border-gray-300"
//                   } px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.origin && (
//                   <p className="mt-1 text-sm text-red-500">{errors.origin}</p>
//                 )}
//               </div>
//             </div>

//             {/* Additional Details */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Meta Tags
//                 </label>
//                 <input
//                   type="text"
//                   name="meta"
//                   value={formData.meta}
//                   onChange={handleInputChange}
//                   placeholder="Separate tags with commas"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className={`w-full rounded-lg border ${
//                     errors.description ? "border-red-500" : "border-gray-300"
//                   } px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.description}
//                   </p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Truth Score (1-10) *
//                 </label>
//                 <input
//                   type="number"
//                   name="truthScore"
//                   min="1"
//                   max="10"
//                   value={formData.truthScore}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-lg border ${
//                     errors.truthScore ? "border-red-500" : "border-gray-300"
//                   } px-4 py-2.5 focus:border-blue-500 focus:ring-                  blue-200`}
//                 />
//                 {errors.truthScore && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.truthScore}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Classification and File Upload */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Classification Level
//                 </label>
//                 <select
//                   name="classification"
//                   value={formData.classification}
//                   onChange={handleInputChange}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                 >
//                   {classificationTypes.map((type) => (
//                     <option key={type} value={type.toLowerCase()}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Upload Document *
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
//                   className={`w-full rounded-lg border ${
//                     errors.file ? "border-red-500" : "border-gray-300"
//                   } px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
//                     file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100`}
//                 />
//                 {errors.file && (
//                   <p className="mt-1 text-sm text-red-500">{errors.file}</p>
//                 )}
//                 <p className="mt-2 text-sm text-gray-500">
//                   Supported formats: PDF, Word, Excel, PowerPoint (Max 10MB)
//                 </p>
//               </div>
//             </div>

//             {/* Category Selection */}
//             <div className="flex items-center justify-end space-x-4">
//               <div className="flex items-center space-x-4">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Category:
//                 </label>
//                 <div className="flex items-center space-x-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="category"
//                       value="softcopy"
//                       checked={formData.category === "softcopy"}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
//                       Softcopy
//                     </span>
//                   </label>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="category"
//                       value="hardcopy"
//                       checked={formData.category === "hardcopy"}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
//                       Hardcopy
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-4 mt-8">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700
//                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                   ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Uploading...
//                   </span>
//                 ) : (
//                   "Upload Document"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Success Modal */}
//           {showModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
//                 <div className="text-center">
//                   <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
//                     <svg
//                       className="h-6 w-6 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
//                     Document Uploaded Successfully
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//                     Your document has been successfully uploaded and processed.
//                   </p>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     Continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default UploadDocuments;

// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function UploadDocuments() {
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     documentFormat: "",
//     documentType: "",
//     name: "",
//     documentDate: "",
//     origin: "",
//     meta: "",
//     description: "",
//     truthScore: "",
//     category: "softcopy",
//     file: null,
//     classification: "unclassified",
//   });

//   const documentFormats = [
//     "PDF",
//     "Microsoft Word",
//     "Microsoft Excel",
//     "Microsoft PowerPoint",
//   ];

//   const documentTypes = ["Mail", "Books", "Publication"];

//   const classificationTypes = [
//     "Unclassified",
//     "Restricted",
//     "Confidential",
//     "Secret",
//     "Top Secret",
//   ];

//   // Form validation logic
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.documentFormat)
//       newErrors.documentFormat = "Please select a document format";
//     if (!formData.documentType)
//       newErrors.documentType = "Please select a document type";
//     if (!formData.name.trim()) newErrors.name = "Document name is required";
//     if (!formData.documentDate) newErrors.documentDate = "Please select a date";
//     if (!formData.origin.trim()) newErrors.origin = "Origin is required";
//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required";
//     } else if (formData.description.length < 10) {
//       newErrors.description = "Description must be at least 10 characters";
//     }
//     if (!formData.truthScore) {
//       newErrors.truthScore = "Truth score is required";
//     } else if (formData.truthScore < 1 || formData.truthScore > 10) {
//       newErrors.truthScore = "Truth score must be between 1 and 10";
//     }
//     if (!formData.file) {
//       newErrors.file = "Please upload a document";
//     } else {
//       const fileSize = formData.file.size / 1024 / 1024;
//       if (fileSize > 10) newErrors.file = "File size should not exceed 10MB";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Event handlers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileType = file.type;
//       const validTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "application/vnd.ms-powerpoint",
//         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//       ];
//       if (!validTypes.includes(fileType)) {
//         toast.error("Invalid file format");
//         return;
//       }
//       setFormData((prev) => ({ ...prev, file }));
//       if (errors.file) setErrors((prev) => ({ ...prev, file: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         setShowModal(true);
//         toast.success("Document uploaded successfully!");
//         handleReset();
//       } catch (error) {
//         toast.error("Upload failed. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       documentFormat: "",
//       documentType: "",
//       name: "",
//       documentDate: "",
//       origin: "",
//       meta: "",
//       description: "",
//       truthScore: "",
//       category: "softcopy",
//       file: null,
//       classification: "unclassified",
//     });
//     setErrors({});
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl  border border-gray-100 dark:border-gray-700">
//           {/* Header Section */}
//           <div className="flex items-center justify-between mb-12 border-b dark:border-gray-700 pb-6">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Document Upload Portal
//               <span className="block text-sm text-gray-500 mt-2 font-normal">
//                 Secure Document Management System
//               </span>
//             </h1>
//             <div className="flex items-center space-x-4">
//               <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
//                 IAF-DSS
//               </span>
//             </div>
//           </div>

//           {/* Form Section */}
//           <form onSubmit={handleSubmit} className="space-y-10">
//             {/* Document Format and Type Selection */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Document Format */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-2 text-blue-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                   Document Format
//                 </label>
//                 <select
//                   name="documentFormat"
//                   value={formData.documentFormat}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-xl border ${
//                     errors.documentFormat
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
//                 >
//                   <option value="">Select Format</option>
//                   {documentFormats.map((format) => (
//                     <option key={format} value={format}>
//                       {format}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.documentFormat && (
//                   <p className="mt-2 text-sm text-red-500">
//                     {errors.documentFormat}
//                   </p>
//                 )}
//               </div>

//               {/* Document Type */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   <svg
//                     className="w-5 h-5 mr-2 text-blue-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                     />
//                   </svg>
//                   Document Type
//                 </label>
//                 <select
//                   name="documentType"
//                   value={formData.documentType}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-xl border ${
//                     errors.documentType
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
//                 >
//                   <option value="">Select Type</option>
//                   {documentTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.documentType && (
//                   <p className="mt-2 text-sm text-red-500">
//                     {errors.documentType}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Document Details */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {/* Document Name */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Document Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-xl border ${
//                     errors.name
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                 />
//                 {errors.name && (
//                   <p className="mt-2 text-sm text-red-500">{errors.name}</p>
//                 )}
//               </div>

//               {/* Document Date */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Document Date
//                 </label>
//                 <input
//                   type="date"
//                   name="documentDate"
//                   value={formData.documentDate}
//                   onChange={handleInputChange}
//                   max={new Date().toISOString().split("T")[0]}
//                   className={`w-full rounded-xl border ${
//                     errors.documentDate
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                 />
//                 {errors.documentDate && (
//                   <p className="mt-2 text-sm text-red-500">
//                     {errors.documentDate}
//                   </p>
//                 )}
//               </div>

//               {/* Origin */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Origin
//                 </label>
//                 <input
//                   type="text"
//                   name="origin"
//                   value={formData.origin}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-xl border ${
//                     errors.origin
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                 />
//                 {errors.origin && (
//                   <p className="mt-2 text-sm text-red-500">{errors.origin}</p>
//                 )}
//               </div>
//             </div>

//             {/* Additional Details */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {/* Meta Tags */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Meta Tags
//                 </label>
//                 <input
//                   type="text"
//                   name="meta"
//                   value={formData.meta}
//                   onChange={handleInputChange}
//                   placeholder="Separate tags with commas"
//                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3
//                     focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                 />
//               </div>

//               {/* Description */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className={`w-full rounded-xl border ${
//                     errors.description
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                 />
//                 {errors.description && (
//                   <p className="mt-2 text-sm text-red-500">
//                     {errors.description}
//                   </p>
//                 )}
//               </div>

//               {/* Truth Score */}
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Truth Score (1-10)
//                 </label>
//                 <input
//                   type="number"
//                   name="truthScore"
//                   min="1"
//                   max="10"
//                   value={formData.truthScore}
//                   onChange={handleInputChange}
//                   className={`w-full rounded-xl border ${
//                     errors.truthScore
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white`}
//                 />
//                 {errors.truthScore && (
//                   <p className="mt-2 text-sm text-red-500">
//                     {errors.truthScore}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Classification and File Upload */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Classification Level
//                 </label>
//                 <select
//                   name="classification"
//                   value={formData.classification}
//                   onChange={handleInputChange}
//                   className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3
//                     focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                 >
//                   {classificationTypes.map((type) => (
//                     <option key={type} value={type.toLowerCase()}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group hover:shadow-md rounded-xl p-4 transition-all duration-300">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
//                   Upload Document
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
//                   className={`w-full rounded-xl border ${
//                     errors.file
//                       ? "border-red-500"
//                       : "border-gray-200 dark:border-gray-700"
//                   }
//                     px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
//                     file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200`}
//                 />
//                 {errors.file && (
//                   <p className="mt-2 text-sm text-red-500">{errors.file}</p>
//                 )}
//                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                   Supported formats: PDF, Word, Excel, PowerPoint (Max 10MB)
//                 </p>
//               </div>
//             </div>

//             {/* Category Selection */}
//             <div className="flex items-center justify-end space-x-4">
//               <div className="flex items-center space-x-6">
//                 <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//                   Category:
//                 </label>
//                 <div className="flex items-center space-x-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="category"
//                       value="softcopy"
//                       checked={formData.category === "softcopy"}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600 focus:ring-blue-400"
//                     />
//                     <span className="ml-2 text-gray-700 dark:text-gray-300">
//                       Softcopy
//                     </span>
//                   </label>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="category"
//                       value="hardcopy"
//                       checked={formData.category === "hardcopy"}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600 focus:ring-blue-400"
//                     />
//                     <span className="ml-2 text-gray-700 dark:text-gray-300">
//                       Hardcopy
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-4 mt-8">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
//                   rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
//                   hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5
//                   transition-all duration-300 ${
//                     isLoading ? "opacity-75 cursor-not-allowed" : ""
//                   }`}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Uploading...
//                   </span>
//                 ) : (
//                   "Upload Document"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Success Modal */}
//           {showModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300">
//                 <div className="text-center">
//                   <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
//                     <svg
//                       className="h-6 w-6 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
//                     Document Uploaded Successfully
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//                     Your document has been successfully uploaded and processed.
//                   </p>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
//                       hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//                   >
//                     Continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default UploadDocuments;
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadDocuments() {
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

  const documentFormats = [
    "PDF",
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
  ];

  const documentTypes = ["Mail", "Books", "Publication"];

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
      newErrors.documentFormat = "Please select a document format";
    if (!formData.documentType)
      newErrors.documentType = "Please select a document type";
    if (!formData.name.trim()) newErrors.name = "Document name is required";
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
        Document Upload Portal
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
                Document Format
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
                {documentFormats.map((format) => (
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
                Document Type
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
                Document Name
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
                Document Date
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

{/* 
      {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Document Uploaded Successfully
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Your document has been successfully uploaded and processed.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
                      hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
  );
}

export default UploadDocuments; */}



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

export default UploadDocuments;
