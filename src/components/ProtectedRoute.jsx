import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  const { token, user } = useSelector((s) => s.auth);

  if (!token) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0) {
    if (!roles.includes(user?.role)) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <Outlet />;
}
