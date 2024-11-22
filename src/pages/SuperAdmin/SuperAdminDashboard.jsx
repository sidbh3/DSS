import React from 'react'
import CardsSection from "../../components/card/CardsSection";
import ChartsSection from "../../components/card/ChartsSection";

const SuperAdminDashboard = () => {
  const superAdminStats = [
    { title: "Total Systems Monitored", value: 50 },
    { title: "Total Users", value: 120 },
    { title: "Data Records Processed", value: 340 },
    { title: "Active Alerts", value: 15 },
  ];

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users",
        data: [50, 70, 80, 120, 150, 200],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: ["Admins", "Editors", "Viewers"],
    datasets: [
      {
        data: [30, 40, 50],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-secondary-foreground tracking-widest">
        Super Admin Dashboard
      </h1>
      <CardsSection stats={superAdminStats} />
     <div className="mt-6">
       <ChartsSection
         lineChartData={lineChartData}
         pieChartData={pieChartData}
       />
     </div>
    </div>
  )
}

export default SuperAdminDashboard