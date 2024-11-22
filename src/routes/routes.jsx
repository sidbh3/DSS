import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import { useAuth } from "../context/AuthContext";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import SuperUserDashboard from "../pages/SupperUser/SuperUserDashboard";
import UserDashboard from "../pages/User/UserDashboard";

const AppRoutes = () => {
  // const { role } = useAuth();
  const role="superuser"
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {role === "superadmin" ? (
           <>
           <Route path="/" element={<ProtectedRoute><DashboardLayout><SuperAdminDashboard /></DashboardLayout></ProtectedRoute>} />
           <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><SuperAdminDashboard /></DashboardLayout></ProtectedRoute>} />
           <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
         </>
        ) : role === "superuser" ? (
          <>
          <Route path="/" element={<ProtectedRoute><DashboardLayout><SuperUserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><SuperUserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
        </>
        ) : (
          <>
          <Route path="/" element={<ProtectedRoute><DashboardLayout><UserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><UserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
        </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
