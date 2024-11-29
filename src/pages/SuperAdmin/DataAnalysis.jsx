import { useEffect, useState } from "react";
import Table2 from "../../components/Common/Tables/Table2";
import { FaFileAlt, FaChartLine, FaSearch, FaUser } from "react-icons/fa";

const dummyData = [
  {
    sr_no: 1,
    document_name: "IAF Flight Operations Manual 2023",
    origin: "Air Operations Command",
    type: "PDF",
    category: "Operations",
    document_date: "2023-01-15",
    designation: "Wing Commander",
    last_updated_by: "Wg Cdr Rajesh Kumar",
  },
  {
    sr_no: 2,
    document_name: "Aircraft Maintenance Schedule",
    origin: "Technical Division",
    type: "XLSX",
    category: "Maintenance",
    document_date: "2023-02-20",
    designation: "Squadron Leader",
    last_updated_by: "Sqn Ldr Priya Sharma",
  },
  {
    sr_no: 3,
    document_name: "Air Defense Strategy 2023",
    origin: "Strategic Command",
    type: "DOCX",
    category: "Strategy",
    document_date: "2023-03-10",
    designation: "Air Commodore",
    last_updated_by: "Air Cmde Vikram Singh",
  },
  {
    sr_no: 4,
    document_name: "Pilot Training Protocol",
    origin: "Training Command",
    type: "PDF",
    category: "Training",
    document_date: "2023-04-05",
    designation: "Group Captain",
    last_updated_by: "Gp Capt Meera Patel",
  },
  {
    sr_no: 5,
    document_name: "Air Base Security Report",
    origin: "Security Division",
    type: "PDF",
    category: "Security",
    document_date: "2023-05-01",
    designation: "Air Marshal",
    last_updated_by: "Air Mshl Arun Verma",
  },
  {
    sr_no: 6,
    document_name: "Aviation Fuel Management",
    origin: "Logistics Command",
    type: "XLSX",
    category: "Logistics",
    document_date: "2023-06-15",
    designation: "Flight Lieutenant",
    last_updated_by: "Flt Lt Sunita Reddy",
  },
  {
    sr_no: 7,
    document_name: "Communication Systems Update",
    origin: "Communications Wing",
    type: "PPTX",
    category: "Technical",
    document_date: "2023-07-20",
    designation: "Squadron Leader",
    last_updated_by: "Sqn Ldr Karthik Iyer",
  },
  {
    sr_no: 8,
    document_name: "Weather Analysis Report",
    origin: "Meteorological Department",
    type: "PDF",
    category: "Operations",
    document_date: "2023-08-01",
    designation: "Wing Commander",
    last_updated_by: "Wg Cdr Zara Khan",
  },
  {
    sr_no: 9,
    document_name: "Aircraft Acquisition Proposal",
    origin: "Planning Division",
    type: "DOCX",
    category: "Planning",
    document_date: "2023-08-15",
    designation: "Air Vice Marshal",
    last_updated_by: "AVM Arjun Mehta",
  },
  {
    sr_no: 10,
    document_name: "Emergency Response Protocol",
    origin: "Operations Command",
    type: "PDF",
    category: "Emergency",
    document_date: "2023-09-01",
    designation: "Group Captain",
    last_updated_by: "Gp Capt Ravi Teja",
  },
  {
    sr_no: 11,
    document_name: "Radar Systems Maintenance",
    origin: "Technical Division",
    type: "XLSX",
    category: "Maintenance",
    document_date: "2023-09-15",
    designation: "Squadron Leader",
    last_updated_by: "Sqn Ldr Ananya Gupta",
  },
  {
    sr_no: 12,
    document_name: "Air Combat Training Manual",
    origin: "Training Command",
    type: "PDF",
    category: "Training",
    document_date: "2023-10-01",
    designation: "Wing Commander",
    last_updated_by: "Wg Cdr Dhruv Kapoor",
  },
  {
    sr_no: 13,
    document_name: "Cyber Security Protocol",
    origin: "IT Division",
    type: "DOCX",
    category: "Security",
    document_date: "2023-10-15",
    designation: "Squadron Leader",
    last_updated_by: "Sqn Ldr Neha Malik",
  },
  {
    sr_no: 14,
    document_name: "Annual Budget Report",
    origin: "Finance Division",
    type: "XLSX",
    category: "Finance",
    document_date: "2023-11-01",
    designation: "Air Commodore",
    last_updated_by: "Air Cmde Rahul Saxena",
  },
  {
    sr_no: 15,
    document_name: "Medical Facilities Update",
    origin: "Medical Services",
    type: "PDF",
    category: "Healthcare",
    document_date: "2023-11-15",
    designation: "Group Captain",
    last_updated_by: "Gp Capt Sanjana Roy",
  },
  {
    sr_no: 16,
    document_name: "Air Traffic Control Manual",
    origin: "ATC Division",
    type: "PDF",
    category: "Operations",
    document_date: "2023-12-01",
    designation: "Wing Commander",
    last_updated_by: "Wg Cdr Kabir Singh",
  },
  {
    sr_no: 17,
    document_name: "Personnel Training Records",
    origin: "HR Division",
    type: "XLSX",
    category: "Personnel",
    document_date: "2023-12-15",
    designation: "Squadron Leader",
    last_updated_by: "Sqn Ldr Maya Desai",
  },
  {
    sr_no: 18,
    document_name: "Aircraft Inventory Report",
    origin: "Logistics Command",
    type: "XLSX",
    category: "Logistics",
    document_date: "2024-01-01",
    designation: "Air Commodore",
    last_updated_by: "Air Cmde Ajay Chauhan",
  },
  {
    sr_no: 19,
    document_name: "Mission Planning Guidelines",
    origin: "Operations Command",
    type: "DOCX",
    category: "Operations",
    document_date: "2024-01-15",
    designation: "Group Captain",
    last_updated_by: "Gp Capt Ishaan Bhat",
  },
  {
    sr_no: 20,
    document_name: "Air Base Infrastructure Plan",
    origin: "Infrastructure Division",
    type: "PPTX",
    category: "Planning",
    document_date: "2024-01-30",
    designation: "Air Marshal",
    last_updated_by: "Air Mshl Vivek Sharma",
  },
];

function DataAnalysis() {
  const [dataAnalysisData, setDataAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      Header: "Sr. No.",
      accessor: "sr_no",
      Cell: ({ value }) => (
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {value}
        </span>
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
      Header: "Designation",
      accessor: "designation",
      Cell: ({ value }) => (
        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm">
          {value}
        </span>
      ),
    },
    {
      Header: "Last Updated By",
      accessor: "last_updated_by",
      Cell: ({ value }) => (
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300">{value}</span>
        </div>
      ),
    },
    {
      Header: "Document Date",
      accessor: "document_date",
      Cell: ({ value }) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
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

export default DataAnalysis;
