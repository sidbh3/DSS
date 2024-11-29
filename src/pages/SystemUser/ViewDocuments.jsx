import React, { useState } from "react";
import Table2 from "../../components/Common/Tables/Table2";

function ViewDocuments() {
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const documentFormats = [
    "PDF",
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
  ];

  const documentTypes = ["Mail", "Books", "Publication"];

  // Sample data for the table
  const data = [
    {
      sr_no: 1,
      document_name: "Annual Report 2023",
      origin: "Finance Department",
      category: "Softcopy",
      upload_date: "2023-12-01",
    },
    {
      sr_no: 2,
      document_name: "Training Manual v2.0",
      origin: "HR Department",
      category: "Hardcopy",
      upload_date: "2023-11-15",
    },
    {
      sr_no: 3,
      document_name: "Project Proposal Q1",
      origin: "Operations",
      category: "Softcopy",
      upload_date: "2023-12-05",
    },
    {
      sr_no: 4,
      document_name: "Security Protocol 2024",
      origin: "IT Department",
      category: "Softcopy",
      upload_date: "2023-12-10",
    },
    {
      sr_no: 5,
      document_name: "Budget Planning 2024",
      origin: "Finance Department",
      category: "Softcopy",
      upload_date: "2023-11-28",
    },
    {
      sr_no: 6,
      document_name: "Employee Handbook",
      origin: "HR Department",
      category: "Hardcopy",
      upload_date: "2023-10-20",
    },
    {
      sr_no: 7,
      document_name: "Market Analysis Report",
      origin: "Marketing",
      category: "Softcopy",
      upload_date: "2023-12-03",
    },
    {
      sr_no: 8,
      document_name: "Technical Documentation",
      origin: "Engineering",
      category: "Softcopy",
      upload_date: "2023-11-25",
    },
    {
      sr_no: 9,
      document_name: "Client Presentation",
      origin: "Sales Department",
      category: "Softcopy",
      upload_date: "2023-12-07",
    },
    {
      sr_no: 10,
      document_name: "Quality Assurance Guidelines",
      origin: "QA Department",
      category: "Hardcopy",
      upload_date: "2023-11-30",
    },
    {
      sr_no: 11,
      document_name: "Strategic Plan 2024-2025",
      origin: "Executive Office",
      category: "Softcopy",
      upload_date: "2023-12-08",
    },
    {
      sr_no: 12,
      document_name: "Compliance Report Q4",
      origin: "Legal Department",
      category: "Softcopy",
      upload_date: "2023-12-02",
    },
    {
      sr_no: 13,
      document_name: "Product Specifications",
      origin: "R&D Department",
      category: "Hardcopy",
      upload_date: "2023-11-22",
    },
    {
      sr_no: 14,
      document_name: "Customer Survey Results",
      origin: "Marketing",
      category: "Softcopy",
      upload_date: "2023-12-04",
    },
    {
      sr_no: 15,
      document_name: "Infrastructure Plan",
      origin: "IT Department",
      category: "Softcopy",
      upload_date: "2023-11-18",
    },
    {
      sr_no: 16,
      document_name: "Vendor Contracts",
      origin: "Procurement",
      category: "Hardcopy",
      upload_date: "2023-12-06",
    },
    {
      sr_no: 17,
      document_name: "Research Findings 2023",
      origin: "R&D Department",
      category: "Softcopy",
      upload_date: "2023-11-29",
    },
    {
      sr_no: 18,
      document_name: "Emergency Procedures",
      origin: "Safety Department",
      category: "Hardcopy",
      upload_date: "2023-12-09",
    },
    {
      sr_no: 19,
      document_name: "Investment Portfolio",
      origin: "Finance Department",
      category: "Softcopy",
      upload_date: "2023-11-27",
    },
    {
      sr_no: 20,
      document_name: "Environmental Impact Study",
      origin: "Sustainability",
      category: "Softcopy",
      upload_date: "2023-12-11",
    },
  ];

  const columns = [
    {
      Header: "Sr. No",
      accessor: "sr_no",
    },
    {
      Header: "Document Name",
      accessor: "document_name",
    },
    {
      Header: "Origin",
      accessor: "origin",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Upload Date",
      accessor: "upload_date",
    },
  ];

  const handleSearch = () => {
    // Implement search logic based on selected format and type
    console.log(
      "Searching with format:",
      selectedFormat,
      "and type:",
      selectedType
    );
  };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-100">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               View Documents
//             </h1>
//           </div>

//           {/* Filter Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             {/* Document Format Dropdown */}
//             <div className="form-group">
//               <label className="text-lg font-semibold text-gray-700 mb-2 block">
//                 Document Format
//               </label>
//               <select
//                 value={selectedFormat}
//                 onChange={(e) => setSelectedFormat(e.target.value)}
//                 className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               >
//                 <option value="">Select Format</option>
//                 {documentFormats.map((format) => (
//                   <option key={format} value={format}>
//                     {format}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Document Type Dropdown */}
//             <div className="form-group">
//               <label className="text-lg font-semibold text-gray-700 mb-2 block">
//                 Document Type
//               </label>
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               >
//                 <option value="">Select Type</option>
//                 {documentTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Search Button */}
//           <div className="flex justify-end mb-8">
//             <button
//               onClick={handleSearch}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
//                 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
//             >
//               Search Documents
//             </button>
//           </div>

//           {/* Table Section */}
//           <div className="mt-8">
//             <Table2
//               data={data}
//               columns={columns}
//               loading={false}
//               error={null}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewDocuments;



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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Document Management System
      <span className="ml-4 text-sm text-gray-500">IAF-DSS</span>
    </h1>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 space-y-6">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Document Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Format</option>
              {documentFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Document Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search Documents
          </button>
        </div>

        {/* Table Section */}
        <div className="mt-6">
          <Table2
            data={data}
            columns={columns}
            loading={false}
            error={null}
          />
        </div>
      </div>
    </div>
  </div>
);
}

export default ViewDocuments;
