import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CRMPipeline from './pages/CRMPipeline';
import ClientPortal from './pages/ClientPortal';
import ClientCredentials from './pages/ClientCredentials';
import ClientLinkage from './pages/ClientLinkage';
import QAHub from './pages/QAHub';
import EmployeePerformance from './pages/EmployeePerformance';
import DataVault from './pages/DataVault';
import EmployeeMaster from './pages/EmployeeMaster';
import RoleMaster from './pages/RoleMaster';
import DepartmentMaster from './pages/DepartmentMaster';
import ShiftManagement from './pages/ShiftManagement';
import DailyReportUpload from './pages/DailyReportUpload';
import ActivityMonitoring from './pages/ActivityMonitoring';
import AuditLogs from './pages/AuditLogs';
import SystemSettings from './pages/SystemSettings';
import Account from './pages/Account';
import Notifications from './pages/Notifications';
import Help from './pages/Help';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crm-pipeline" element={<CRMPipeline />} />
        <Route path="/client-portal" element={<ClientPortal />} />
        <Route path="/client-credentials" element={<ClientCredentials />} />
        <Route path="/client-linkage" element={<ClientLinkage />} />
        <Route path="/qa-hub" element={<QAHub />} />
        <Route path="/employee-performance" element={<EmployeePerformance />} />
        <Route path="/data-vault" element={<DataVault />} />
        <Route path="/employee-master" element={<EmployeeMaster />} />
        <Route path="/role-master" element={<RoleMaster />} />
        <Route path="/department-master" element={<DepartmentMaster />} />
        <Route path="/shift-management" element={<ShiftManagement />} />
        <Route path="/daily-report-upload" element={<DailyReportUpload />} />
        <Route path="/activity-monitoring" element={<ActivityMonitoring />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/system-settings" element={<SystemSettings />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
