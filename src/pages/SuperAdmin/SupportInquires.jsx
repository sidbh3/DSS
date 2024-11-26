
import { useEffect, useState } from "react";
import Table2 from "../../components/Common/Tables/Table2";
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

  const columns = [
    {
      Header: "Sr. No.",
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
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Document Date",
      accessor: "document_date",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDataAnalysis(dummyData);
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-wide border-b border-gray-200 dark:border-gray-700 pb-4">
      Support Inquires
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
