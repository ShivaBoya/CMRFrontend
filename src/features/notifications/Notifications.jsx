import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAllRead } from "./notificationsSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.notifications.list);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-3">Notifications</h2>

      <button
        className="bg-gray-700 text-white px-4 py-1 rounded mb-4"
        onClick={() => dispatch(markAllRead())}
      >
        Mark all as read
      </button>

      <div className="space-y-2">
        {list.map((n, idx) => (
          <div
            key={idx}
            className={`p-3 rounded shadow ${
              n.read ? "bg-gray-100" : "bg-yellow-100"
            }`}
          >
            <div className="font-semibold">{n.title}</div>
            <div className="text-sm text-gray-700">{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
