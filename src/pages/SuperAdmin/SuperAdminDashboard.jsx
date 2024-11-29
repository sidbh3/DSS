import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { generateDashboardData } from "../../dummyDataGenerator";

function SuperAdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    systemMetrics: [],
    reports: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      const data = generateDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const systemRunningCount = dashboardData.systemMetrics.filter(
    (item) => item.type === "system_running"
  ).length;
  const standardUserCount = dashboardData.systemMetrics.filter(
    (item) => item.type === "standard_user"
  ).length;
  const dataRecordsCount = dashboardData.systemMetrics.filter(
    (item) => item.type === "data_record"
  ).length;
  const totalSystemUsers = dashboardData.systemMetrics.length;

  const barChartData = {
    labels: ["System Running", "Standard Users", "Data Records", "Total Users"],
    datasets: [
      {
        label: "Statistics",
        data: [
          systemRunningCount,
          standardUserCount,
          dataRecordsCount,
          totalSystemUsers,
        ],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#6366F1"],
        borderColor: ["#4338CA", "#059669", "#D97706", "#4F46E5"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["System Running", "Standard Users", "Data Records"],
    datasets: [
      {
        data: [systemRunningCount, standardUserCount, dataRecordsCount],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
        borderColor: ["#4338CA", "#059669", "#D97706"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 13,
          },
          padding: 20,
          boxWidth: 15,
          color: "rgb(156, 163, 175)",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 13,
          },
          padding: 20,
          boxWidth: 15,
          color: "rgb(156, 163, 175)",
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-8  bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-wide border-b border-gray-200 dark:border-gray-700 pb-4">
        Super Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-2">
              Total System Running
            </h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {systemRunningCount}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-2">
              Total Standard Users
            </h3>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {standardUserCount}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-2">
              Total Data Records
            </h3>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {dataRecordsCount}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-2">
              Total System Users
            </h3>
            <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
              {totalSystemUsers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Distribution Overview
            </h2>
            <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              Statistics
            </div>
          </div>
          <div className="h-[450px] flex items-center justify-center">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Distribution Ratio
            </h2>
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
              Overview
            </div>
          </div>
          <div className="h-[450px] flex items-center justify-center">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
