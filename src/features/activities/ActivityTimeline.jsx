import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivitiesByLead,
  addActivity,
} from "./activitiesSlice";

export default function ActivityTimeline({ leadId }) {
  const dispatch = useDispatch();
  const activities = useSelector(
    (s) => s.activities.byLead[leadId] || []
  );

  const [note, setNote] = useState("");

  useEffect(() => {
    dispatch(fetchActivitiesByLead(leadId));
  }, [dispatch, leadId]);

  const submit = (e) => {
    e.preventDefault();
    if (note.trim().length === 0) return;
    dispatch(addActivity({ leadId, content: note }));
    setNote("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Activity Timeline</h3>

      {/* Add Note */}
      <form onSubmit={submit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          Add Activity
        </button>
      </form>

      {/* Activity List */}
      <div className="space-y-2">
        {activities.map((a) => (
          <div
            key={a.id}
            className="p-3 bg-white shadow rounded border"
          >
            <div className="text-gray-600 text-sm">
              {a.type} • {new Date(a.createdAt).toLocaleString()}
            </div>
            <div>{a.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
