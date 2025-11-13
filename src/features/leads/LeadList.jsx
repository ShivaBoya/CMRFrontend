import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "./leadsSlice";
import { Link } from "react-router-dom";

export default function LeadList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.leads);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Leads</h2>

      <div className="space-y-2">
        {list.map((lead) => (
          <Link
            to={`/leads/${lead.id}`}
            key={lead.id}
            className="block bg-white shadow rounded p-4"
          >
            <div className="font-bold">{lead.name}</div>
            <div className="text-sm text-gray-600">{lead.company}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
