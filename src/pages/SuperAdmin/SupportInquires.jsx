import { useEffect, useState } from "react";
import Table2 from "../../components/Common/Tables/Table2";
import { FaFileAlt, FaChartLine, FaSearch, FaExclamationCircle } from "react-icons/fa";

const dummyData = [
  {
    sr_no: 1,
    document_name: "Aircraft Maintenance Manual",
    origin: "Technical Division",
    type: "PDF",
    category: "Maintenance",
    document_date: "2024-01-15",
    query: "Request for clarification on maintenance schedule",
    status: "Pending",
    priority: "High"
  },
  {
    sr_no: 2,
    document_name: "Flight Safety Protocol",
    origin: "Flight Safety Wing",
    type: "DOCX",
    category: "Safety",
    document_date: "2024-01-20",
    query: "Update needed for emergency procedures",
    status: "In Progress",
    priority: "Critical"
  },
  {
    sr_no: 3,
    document_name: "Pilot Training Guidelines",
    origin: "Training Command",
    type: "PDF",
    category: "Training",
    document_date: "2024-01-25",
    query: "Revision required for new aircraft integration",
    status: "Resolved",
    priority: "Medium"
  },
  {
    sr_no: 4,
    document_name: "Air Defense Operations Manual",
    origin: "Air Defense Command",
    type: "PDF",
    category: "Operations",
    document_date: "2024-01-28",
    query: "Request for updated radar protocols",
    status: "Under Review",
    priority: "High"
  },
  {
    sr_no: 5,
    document_name: "Communication Systems Guide",
    origin: "Signals Division",
    type: "PPTX",
    category: "Technical",
    document_date: "2024-02-01",
    query: "Encryption protocol clarification needed",
    status: "Pending",
    priority: "Critical"
  },
  {
    sr_no: 6,
    document_name: "Weapons Systems Manual",
    origin: "Armament Division",
    type: "PDF",
    category: "Technical",
    document_date: "2024-02-03",
    query: "Integration issues with new missile systems",
    status: "In Progress",
    priority: "Critical"
  },
  {
    sr_no: 7,
    document_name: "Air Traffic Control Guidelines",
    origin: "ATC Division",
    type: "PDF",
    category: "Operations",
    document_date: "2024-02-05",
    query: "Clarification on new approach procedures",
    status: "Under Review",
    priority: "High"
  },
  {
    sr_no: 8,
    document_name: "Medical Evacuation Protocol",
    origin: "Medical Services",
    type: "DOCX",
    category: "Medical",
    document_date: "2024-02-07",
    query: "Update required for high-altitude operations",
    status: "Pending",
    priority: "High"
  },
  {
    sr_no: 9,
    document_name: "Logistics Support Manual",
    origin: "Logistics Command",
    type: "PDF",
    category: "Logistics",
    document_date: "2024-02-10",
    query: "Supply chain optimization queries",
    status: "In Progress",
    priority: "Medium"
  },
  {
    sr_no: 10,
    document_name: "Cyber Security Framework",
    origin: "IT Division",
    type: "PDF",
    category: "Security",
    document_date: "2024-02-12",
    query: "Implementation of new security protocols",
    status: "Under Review",
    priority: "Critical"
  },
  {
    sr_no: 11,
    document_name: "Weather Analysis System",
    origin: "Met Division",
    type: "XLSX",
    category: "Operations",
    document_date: "2024-02-15",
    query: "Integration with new weather radar",
    status: "Pending",
    priority: "High"
  },
  {
    sr_no: 12,
    document_name: "Personnel Training Records",
    origin: "HR Division",
    type: "XLSX",
    category: "Personnel",
    document_date: "2024-02-18",
    query: "Database synchronization issues",
    status: "Resolved",
    priority: "Medium"
  },
  {
    sr_no: 13,
    document_name: "Emergency Response Plan",
    origin: "Operations Command",
    type: "PDF",
    category: "Emergency",
    document_date: "2024-02-20",
    query: "Update needed for new base locations",
    status: "In Progress",
    priority: "High"
  },
  {
    sr_no: 14,
    document_name: "Fuel Management System",
    origin: "Logistics Command",
    type: "PPTX",
    category: "Logistics",
    document_date: "2024-02-22",
    query: "Real-time tracking implementation",
    status: "Under Review",
    priority: "High"
  },
  {
    sr_no: 15,
    document_name: "Navigation Systems Guide",
    origin: "Technical Division",
    type: "PDF",
    category: "Technical",
    document_date: "2024-02-25",
    query: "GPS integration clarification",
    status: "Pending",
    priority: "Medium"
  },
  {
    sr_no: 16,
    document_name: "Combat Training Manual",
    origin: "Training Command",
    type: "PDF",
    category: "Training",
    document_date: "2024-02-28",
    query: "VR simulation integration support",
    status: "In Progress",
    priority: "High"
  },
  {
    sr_no: 17,
    document_name: "Base Security Protocol",
    origin: "Security Wing",
    type: "DOCX",
    category: "Security",
    document_date: "2024-03-01",
    query: "Access control system upgrade",
    status: "Under Review",
    priority: "Critical"
  },
  {
    sr_no: 18,
    document_name: "Aircraft Inventory System",
    origin: "Asset Management",
    type: "XLSX",
    category: "Logistics",
    document_date: "2024-03-03",
    query: "Parts tracking module issues",
    status: "Pending",
    priority: "High"
  },
  {
    sr_no: 19,
    document_name: "Communication Protocol",
    origin: "Signals Division",
    type: "PDF",
    category: "Communications",
    document_date: "2024-03-05",
    query: "Secure channel configuration",
    status: "In Progress",
    priority: "Critical"
  },
  {
    sr_no: 20,
    document_name: "Mission Planning Software",
    origin: "Operations Command",
    type: "PPTX",
    category: "Operations",
    document_date: "2024-03-08",
    query: "3D mapping integration support",
    status: "Under Review",
    priority: "High"
  }
];


function SupportInquiries() {
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
      Header: "Query",
      accessor: "query",
      Cell: ({ value }) => (
        <div className="flex items-center space-x-2">
          <FaExclamationCircle className="text-yellow-500" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      Header: "Priority",
      accessor: "priority",
      Cell: ({ value }) => {
        const colors = {
          High: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
          Critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        };
        return (
          <span className={`px-3 py-1 rounded-full ${colors[value]} text-sm font-medium`}>
            {value}
          </span>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        const colors = {
          Pending: "bg-yellow-100 text-yellow-800",
          "In Progress": "bg-blue-100 text-blue-800",
          Resolved: "bg-green-100 text-green-800",
          "Under Review": "bg-purple-100 text-purple-800"
        };
        return (
          <span className={`px-3 py-1 rounded-full ${colors[value]} text-sm font-medium`}>
            {value}
          </span>
        );
      },
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
    <div className="w-full flex flex-col gap-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-wide border-b border-gray-200 dark:border-gray-700 pb-4">
        Support Inquiries
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

export default SupportInquiries;
