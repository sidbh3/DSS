import { useEffect, useState } from "react";
import Table from "../../components/Common/Tables/Table";
import { generateDummyLicenseData } from "../../dummyDataGenerator";

function SystemUserDashboard() {
  const [systemUserData, setSystemUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLicensesData = async () => {
    try {
      const dummyData = generateDummyLicenseData();
      setSystemUserData(dummyData);
    } catch (error) {
      console.error("Failed to load license data:", error);
      setError("Failed to load license data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicensesData();
  }, []);

  const tabData = [
    {
      label: "Generated",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: systemUserData
        ?.filter((item) => item.type === "Generated")
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category,
        })),
    },
    {
      label: "OSINT",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: systemUserData
        ?.filter((item) => item.type === "OSINT")
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category,
        })),
    },
    {
      label: "Confidential",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: systemUserData
        ?.filter((item) => item.type === "Confidential")
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category,
        })),
    },
    {
      label: "Exception",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: systemUserData
        ?.filter((item) => item.type === "Exception")
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category,
        })),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-secondary-foreground tracking-widest">
        System User Dashboard
      </h1>
      <div className="">
        <Table
          tabData={tabData}
          loading={loading}
          setLoading={setLoading}
          error={error}
          fetchLicensesData={fetchLicensesData}
        />
      </div>
    </div>
  );
}

export default SystemUserDashboard;
