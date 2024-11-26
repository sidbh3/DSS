// import { useEffect, useState } from "react";
// import Table from "../../components/Common/Tables/Table";
// import { fetchLicenses } from "../../Api/api";

// function SuperUserDashboard() {
//   const [licenseData, setLicenseData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchLicensesData = async () => {
//     try {
//       const response = await fetchLicenses();
//       if (!response.ok) {
//         throw new Error("Error fetching data");
//       }
//       const result = await response.json();
//       console.log(result);
//       if (result) {
//         setLicenseData(result);
//       } else if (result.length === 0) {
//         setError("No data available!");
//         toast.info("No data available!");
//       } else {
//         setError("Server response not Ok!");
//         toast.warn("Server response not Ok!");
//       }
//     } catch (error) {
//       console.error("Failed to load license data:", error);
//       setError("Failed to load license data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLicensesData();
//   }, []);

//   const tabData = [
//     {
//       label: "Generated",
//       headers: [
//         "Sr. No.",
//         "Report Name",
//         "Origin",
//         "Upload Date",
//         "Category"
//         // "Email",
//         // "Validity From",
//         // "Validity Till",
//         // "Issue",
//       ],
//       data: licenseData
//         ?.filter(
//           (item) =>
//             !item.allocated_to && (!item.plugins || item.plugins.length === 0)
//         )
//         ?.map((item, index) => ({
//           sr_no: index + 1,
//           license_id: item?.license_id,
//           plugin_id: item?.plugins[0]?.plugin_id,
//           email: item?.allocated_to,
//           validity_from: item?.valid_from,
//           validity_till: item?.valid_till,
//           status: item?.status === "0" ? "Inactive" : "Active",
//           is_reserved: item?.is_reserved,
//           issue: item?.status,
//         })),
//     },
//     {
//       label: "OSINT",
//       headers: [
//         "Sr. No.",
//         "Report Name",
//         "Origin",
//         "Upload Date",
//         "Category",
//         // "Validity From",
//         // "Validity Till",
//         // "Issue",
//       ],
//       data: licenseData
//         ?.filter(
//           (item) =>
//             item.allocated_to &&
//             item.plugins &&
//             item.plugins.length > 0 &&
//             item.plugins[0].plugin_id
//         )
//         ?.map((item, index) => ({
//           sr_no: index + 1,
//           license_id: item?.license_id,
//           plugin_id: item?.plugins[0]?.plugin_id,
//           email: item?.allocated_to,
//           validity_from: item?.valid_from,
//           validity_till: item?.valid_till,
//           issue: item?.status,
//         })),
//     },
//     {
//       label: "Confidential",
//       headers: [
//         "Sr. No.",
//         "Report Name",
//         "Origin",
//         "Upload Date",
//         "Category",
//         // "Validity From",
//         // "Validity Till",
//         // "Issue",
//       ],
//       data: licenseData
//         ?.filter(
//           (item) =>
//             item.allocated_to && (!item.plugins || item.plugins.length === 0)
//         )
//         ?.map((item, index) => ({
//           sr_no: index + 1,
//           license_id: item?.license_id,
//           plugin_id: item?.plugins[0]?.plugin_id,
//           email: item?.allocated_to,
//           validity_from: item?.valid_from,
//           validity_till: item?.valid_till,
//           issue: item?.status,
//         })),
//     },
//     {
//       label: "Exception",
//       headers: [
//         "Sr. No.",
//         "Report Name",
//         "Origin",
//         "Upload Date",
//         "Category"
//         // "Validity From",
//         // "Validity Till",
//         // "History",
//       ],
//       data: licenseData?.map((item, index) => ({
//         sr_no: index + 1,
//         license_id: item?.license_id,
//         plugin_id: item?.plugins[0]?.plugin_id,
//         email: item?.allocated_to,
//         validity_from: item?.valid_from,
//         validity_till: item?.valid_till,
//         issue: item?.status,
//       })),
//     },
//   ];

//   return (
//     <div className="w-full flex flex-col gap-5">
//       <h1 className="text-2xl font-semibold text-secondary-foreground tracking-widest">
//         Super User Dashboard
//       </h1>
//       <div className="">
//         <Table
//           tabData={tabData}
//           loading={loading}
//           setLoading={setLoading}
//           error={error}
//           fetchLicensesData={fetchLicensesData}
//         />
//       </div>
//     </div>
//   );
// }

// export default SuperUserDashboard;




import { useEffect, useState } from "react";
import Table from "../../components/Common/Tables/Table";
import { generateDummyLicenseData } from "../../dummyDataGenerator";

function SystemUserDashboard() {
  const [licenseData, setLicenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLicensesData = async () => {
    try {
      const dummyData = generateDummyLicenseData();
      setLicenseData(dummyData);
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
      data: licenseData
        ?.filter((item) => !item.allocated_to && (!item.plugins || item.plugins.length === 0))
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category
        })),
    },
    {
      label: "OSINT",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: licenseData
        ?.filter((item) => item.allocated_to && item.plugins && item.plugins.length > 0)
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category
        })),
    },
    {
      label: "Confidential",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: licenseData
        ?.filter((item) => item.allocated_to && (!item.plugins || item.plugins.length === 0))
        ?.map((item) => ({
          sr_no: item.sr_no,
          report_name: item.report_name,
          origin: item.origin,
          upload_date: item.upload_date,
          category: item.category
        })),
    },
    {
      label: "Exception",
      headers: ["Sr. No.", "Report Name", "Origin", "Upload Date", "Category"],
      data: licenseData?.map((item) => ({
        sr_no: item.sr_no,
        report_name: item.report_name,
        origin: item.origin,
        upload_date: item.upload_date,
        category: item.category
      })),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-secondary-foreground tracking-widest">
        Normal User Dashboard
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
