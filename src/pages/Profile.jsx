import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { MdMilitaryTech, MdSecurity, MdAnalytics } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    rank: "Wing Commander",
    serviceNumber: "IAF/DSS/456",
    unit: "Decision Support Wing",
    role: "System Analyst",
    clearanceLevel: "Level 3",
    baseLocation: "Air Force Command HQ",
    yearsOfService: "15",
    specialization: "Decision Analytics",
    operationalAreas: [
      "Strategic Planning",
      "Resource Management",
      "Mission Analysis"
    ],
    recentActivities: [
      { date: "2024-01-15", activity: "Mission Resource Analysis", status: "Completed" },
      { date: "2024-01-12", activity: "Strategic Assessment", status: "In Progress" },
      { date: "2024-01-10", activity: "Operational Planning", status: "Completed" }
    ]
  });

  return (
    <div className="w-full flex flex-col gap-5 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#001F54] to-[#034694] rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-lg">
              <FaUserCircle className="w-28 h-28 text-white/90" />
            </div>
            <div className="text-white">
              <h2 className="text-4xl font-bold tracking-tight">{userInfo.rank} {user?.name || "John Smith"}</h2>
              <p className="text-gray-200 mt-2 text-lg">{userInfo.serviceNumber}</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {userInfo.role}
                </span>
                <span className="bg-green-500/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  Clearance: {userInfo.clearanceLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Service Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#001F54] dark:text-white">
            <MdMilitaryTech className="text-3xl" />
            Service Profile
          </h3>
          <div className="space-y-4">
            <InfoRow label="Unit" value={userInfo.unit} />
            <InfoRow label="Base Location" value={userInfo.baseLocation} />
            <InfoRow label="Years of Service" value={userInfo.yearsOfService} />
            <InfoRow label="Specialization" value={userInfo.specialization} />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#001F54] dark:text-white">
            <MdAnalytics className="text-3xl" />
            Recent Activities
          </h3>
          <div className="space-y-6">
            {userInfo.recentActivities.map((activity, index) => (
              <div key={index} className="border-l-4 border-[#001F54] pl-6 py-3">
                <div className="text-lg font-medium dark:text-white">{activity.activity}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    activity.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b dark:border-gray-700 py-3">
    <span className="font-medium text-gray-600 dark:text-gray-300">{label}</span>
    <span className="text-gray-800 dark:text-gray-100 font-medium">{value}</span>
  </div>
);

export default Profile;
