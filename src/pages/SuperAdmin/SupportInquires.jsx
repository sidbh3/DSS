



import { useEffect, useState } from "react";
import Table2 from "../../components/Common/Tables/Table2";
import { FaFileAlt, FaChartLine, FaSearch } from "react-icons/fa";
const dummyData = [
  {
    sr_no: 1,
    document_name: "Annual Report 2023",
    origin: "Finance Department",
    type: "PDF",
    category: "Financial",
    document_date: "2023-01-15",
  },
  {
    sr_no: 2,
    document_name: "Marketing Strategy",
    origin: "Marketing Team",
    type: "DOCX",
    category: "Strategy",
    document_date: "2023-02-20",
  },
  {
    sr_no: 3,
    document_name: "Product Roadmap",
    origin: "Product Team",
    type: "XLSX",
    category: "Planning",
    document_date: "2023-03-10",
  },
  {
    sr_no: 4,
    document_name: "HR Policy Update",
    origin: "Human Resources",
    type: "PDF",
    category: "Policy",
    document_date: "2023-04-05",
  },
  {
    sr_no: 5,
    document_name: "Q2 Sales Report",
    origin: "Sales Department",
    type: "PPTX",
    category: "Reports",
    document_date: "2023-07-01",
  },
];

function SupportInquires() {
  const [dataAnalysisData, setDataAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      Header: "Sr. No.",
      accessor: "sr_no",
      Cell: ({ value }) => (
        <span className="font-semibold text-gray-700 dark:text-gray-300">{value}</span>
      ),
    },
    {
      Header: "Document Name",
      accessor: "document_name",
      Cell: ({ value }) => (
        <div className="flex items-center space-x-2">
          <FaFileAlt className="text-blue-500" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      Header: "Origin",
      accessor: "origin",
      Cell: ({ value }) => (
        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm">
          {value}
        </span>
      ),
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ value }) => (
        <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium">
          {value}
        </span>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ value }) => (
        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm">
          {value}
        </span>
      ),
    },
    {
      Header: "Document Date",
      accessor: "document_date",
      Cell: ({ value }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      ),
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setDataAnalysis(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-full flex flex-col gap-8  bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-wide border-b border-gray-200 dark:border-gray-700 pb-4">
        Data Analysis
      </h1>
      <div>
        <Table2
          data={dataAnalysisData}
          columns={columns}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default SupportInquires;
