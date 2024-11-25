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
import ContentManagement from "../pages/SuperAdmin/ContentManagement";
import DataAnalysis from "../pages/SuperAdmin/DataAnalysis";
import RoleManagement from "../pages/SuperAdmin/RoleManagement";
import UserManagement from "../pages/SuperAdmin/UserManagement";
import GenerateReports from "../pages/SupperUser/GenerateReports";
import Starred from "../pages/SupperUser/Starred";
import UploadDocuments from "../pages/SupperUser/UploadDocuments";
import UploadSymbols from "../pages/SupperUser/UploadSymbols";
import ViewDocuments from "../pages/SupperUser/ViewDocuments";
import ViewSymbols from "../pages/SupperUser/ViewSymbols";
import Logout from "../pages/Logout";

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
           <Route path="/content-management" element={<ProtectedRoute><DashboardLayout><ContentManagement /></DashboardLayout></ProtectedRoute>} />
           <Route path="/data-analysis" element={<ProtectedRoute><DashboardLayout><DataAnalysis /></DashboardLayout></ProtectedRoute>} />
           <Route path="/role-management" element={<ProtectedRoute><DashboardLayout><RoleManagement /></DashboardLayout></ProtectedRoute>} />
           <Route path="/support-inquiries" element={<ProtectedRoute><DashboardLayout><SupportInquires /></DashboardLayout></ProtectedRoute>} />
           <Route path="/user-management" element={<ProtectedRoute><DashboardLayout><UserManagement /></DashboardLayout></ProtectedRoute>} />
           <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
         </>
        ) : role === "superuser" ? (
          <>
          <Route path="/" element={<ProtectedRoute><DashboardLayout><SuperUserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><SuperUserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/generate-report" element={<ProtectedRoute><DashboardLayout><GenerateReports /></DashboardLayout></ProtectedRoute>} />
          <Route path="/starred" element={<ProtectedRoute><DashboardLayout><Starred /></DashboardLayout></ProtectedRoute>} />
          <Route path="/upload-documents" element={<ProtectedRoute><DashboardLayout><UploadDocuments/></DashboardLayout></ProtectedRoute>} />
          <Route path="/upload-symbols" element={<ProtectedRoute><DashboardLayout><UploadSymbols /></DashboardLayout></ProtectedRoute>} />
          <Route path="/view-documents" element={<ProtectedRoute><DashboardLayout><ViewDocuments /></DashboardLayout></ProtectedRoute>} />
          <Route path="/view-symbols" element={<ProtectedRoute><DashboardLayout><ViewSymbols/></DashboardLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
        </>
        ) : (
          <>
          <Route path="/" element={<ProtectedRoute><DashboardLayout><UserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><UserDashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><DashboardLayout><Map /></DashboardLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
        </>
        )}
        <Route path="/logout" element={<ProtectedRoute><DashboardLayout><Logout /></DashboardLayout></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
