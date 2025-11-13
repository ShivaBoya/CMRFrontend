import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import LeadList from "./features/leads/LeadList";
import LeadDetails from "./features/leads/LeadDetails";
import Notifications from "./features/notifications/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";

import { initSocket, disconnectSocket } from "./services/socket";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    initSocket();
    return () => disconnectSocket();
  }, []);

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute roles={["Admin", "Manager", "Sales"]} />}>
        <Route
          path="/"
          element={
            <Layout>
              <h2 className="text-2xl font-bold">Dashboard</h2>
            </Layout>
          }
        />

        <Route
          path="/leads"
          element={
            <Layout>
              <LeadList />
            </Layout>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <Layout>
              <LeadDetails />
            </Layout>
          }
        />

        <Route
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />
      </Route>

      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<div>Unauthorized</div>} />
    </Routes>
  );
}

export default App;
