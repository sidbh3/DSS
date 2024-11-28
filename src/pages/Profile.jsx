import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaMedal, FaUserCircle, FaChartLine, FaClipboardCheck } from "react-icons/fa";
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
    systemAccess: ["Threat Assessment Module", "Resource Allocation System", "Strategic Planning Tool"],
    certifications: ["Advanced Decision Making", "Military Intelligence Analysis", "Strategic Operations"],
    recentDecisions: [
      { date: "2023-12-01", type: "Resource Allocation", impact: "High" },
      { date: "2023-11-28", type: "Threat Assessment", impact: "Medium" },
      { date: "2023-11-25", type: "Strategic Planning", impact: "High" }
    ]
  });

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#001F54] to-[#034694] rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <FaUserCircle className="w-24 h-24 text-white/90" />
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold">{userInfo.rank} {user?.name || "John Smith"}</h2>
              <p className="text-gray-200 mt-1">{userInfo.serviceNumber}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {userInfo.role}
                </span>
                <span className="bg-green-500/20 px-3 py-1 rounded-full text-sm">
                  Clearance: {userInfo.clearanceLevel}
                </span>
              </div>
            </div>
          </div>
          <Link to="/edit-profile" className="text-white hover:text-gray-300 transition-colors">
            <FaEdit className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#001F54]">
            <MdMilitaryTech className="text-2xl" />
            Service Profile
          </h3>
          <div className="space-y-3">
            <InfoRow label="Unit" value={userInfo.unit} />
            <InfoRow label="Role" value={userInfo.role} />
            <InfoRow label="Base Location" value={userInfo.baseLocation} />
            <InfoRow label="Years of Service" value={userInfo.yearsOfService} />
            <InfoRow label="Specialization" value={userInfo.specialization} />
          </div>
        </div>

        {/* System Access */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#001F54]">
            <MdSecurity className="text-2xl" />
            System Access & Certifications
          </h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                System Access Modules
              </h4>
              <div className="space-y-2">
                {userInfo.systemAccess.map((access, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-50 dark:bg-gray-700 p-2 rounded">
                    <FaChartLine className="text-[#001F54]" />
                    <span className="text-sm">{access}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Certifications
              </h4>
              <div className="space-y-2">
                {userInfo.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 bg-green-50 dark:bg-gray-700 p-2 rounded">
                    <FaMedal className="text-[#001F54]" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Decisions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#001F54]">
            <MdAnalytics className="text-2xl" />
            Recent Decision Activities
          </h3>
          <div className="space-y-4">
            {userInfo.recentDecisions.map((decision, index) => (
              <div key={index} className="border-l-4 border-[#001F54] pl-4 py-2">
                <div className="text-sm font-medium">{decision.type}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{decision.date}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    decision.impact === 'High' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {decision.impact} Impact
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
  <div className="flex justify-between items-center border-b dark:border-gray-700 py-2">
    <span className="font-medium text-gray-600 dark:text-gray-300">{label}</span>
    <span className="text-gray-800 dark:text-gray-100">{value}</span>
  </div>
);

export default Profile;
