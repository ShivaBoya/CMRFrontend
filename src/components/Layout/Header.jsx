import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="w-full bg-white shadow p-4 flex justify-between">
      <div className="font-bold">Welcome, {user?.name}</div>

      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
