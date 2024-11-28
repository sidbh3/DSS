import React, { useEffect } from "react";
import Table2 from "../../../components/Common/Tables/Table2";

const data = [
  {
    empId: "IAF1001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@iaf.gov.in",
    designation: "Squadron Leader",
    lastUpdated: "2024-01-15T14:30:00",
  },
  {
    empId: "IAF1002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@iaf.gov.in",
    designation: "Wing Commander",
    lastUpdated: "2024-01-14T09:15:00",
  },
  {
    empId: "IAF1003",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@iaf.gov.in",
    designation: "Flight Lieutenant",
    lastUpdated: "2024-01-13T16:45:00",
  },
  {
    empId: "IAF1004",
    firstName: "Meera",
    lastName: "Patel",
    email: "meera.patel@iaf.gov.in",
    designation: "Group Captain",
    lastUpdated: "2024-01-12T11:20:00",
  },
  {
    empId: "IAF1005",
    firstName: "Arun",
    lastName: "Verma",
    email: "arun.verma@iaf.gov.in",
    designation: "Air Commodore",
    lastUpdated: "2024-01-11T13:40:00",
  },
  {
    empId: "IAF1006",
    firstName: "Sunita",
    lastName: "Reddy",
    email: "sunita.reddy@iaf.gov.in",
    designation: "Flying Officer",
    lastUpdated: "2024-01-10T10:05:00",
  },
  {
    empId: "IAF1007",
    firstName: "Karthik",
    lastName: "Iyer",
    email: "karthik.iyer@iaf.gov.in",
    designation: "Air Marshal",
    lastUpdated: "2024-01-09T15:55:00",
  },
  {
    empId: "IAF1008",
    firstName: "Zara",
    lastName: "Khan",
    email: "zara.khan@iaf.gov.in",
    designation: "Squadron Leader",
    lastUpdated: "2024-01-08T12:25:00",
  },
];

const columns = [
  {
    Header: "Sr. No.",
    accessor: "sr_no",
  },
  {
    Header: "Employee ID",
    accessor: "empId",
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Designation",
    accessor: "designation",
  },
  {
    Header: "Last Updated",
    accessor: "lastUpdated",
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];

function ExistingRole() {
  const [userData, setUserData] = React.useState([]);

  useEffect(() => {
    setUserData(data);
  }, []);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          Existing Users
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-4">
            Indian Air Force
          </span>
        </h1>

        <div>
          <Table2 data={userData} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default ExistingRole;
