import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">CRM</h2>

      <nav className="space-y-3">
        <Link to="/" className="block">Dashboard</Link>
        <Link to="/leads" className="block">Leads</Link>
        <Link to="/notifications" className="block">Notifications</Link>
      </nav>
    </div>
  );
}
