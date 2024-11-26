import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaMedal, FaUserCircle } from "react-icons/fa";
import { MdMilitaryTech } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    rank: "Wing Commander",
    serviceNumber: "IAF/123/456",
    unit: "Eastern Air Command",
    squadron: "No. 7 Squadron",
    baseLocation: "Air Force Station Hasimara",
    yearsOfService: "15",
    specialization: "Fighter Pilot",
    decorations: ["Vir Chakra", "Vayu Sena Medal"]
  });

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="bg-[#001F54] rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUserCircle className="w-20 h-20 text-gray-400" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{userInfo.rank} {user?.name || "John Smith"}</h2>
              <p className="text-gray-300">{userInfo.serviceNumber}</p>
            </div>
          </div>
          <Link to="/edit-profile" className="text-white hover:text-gray-300">
            <FaEdit className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
            <MdMilitaryTech className="text-[#001F54]" />
            Service Information
          </h3>
          <div className="space-y-3">
            <InfoRow label="Unit" value={userInfo.unit} />
            <InfoRow label="Squadron" value={userInfo.squadron} />
            <InfoRow label="Base Location" value={userInfo.baseLocation} />
            <InfoRow label="Years of Service" value={userInfo.yearsOfService} />
            <InfoRow label="Specialization" value={userInfo.specialization} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
            <FaMedal className="text-[#001F54]" />
            Decorations & Contact
          </h3>
          <div className="space-y-3">
            <InfoRow label="Decorations" value={userInfo.decorations.join(", ")} />
            <InfoRow label="Email" value={user?.email || "john.smith@iaf.gov.in"} />
            <InfoRow label="Phone" value={userInfo.phone || "+91 XXXXXXXXXX"} />
            <InfoRow label="Emergency Contact" value={userInfo.emergency || "+91 XXXXXXXXXX"} />
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
