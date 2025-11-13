import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLeads } from "./leadsSlice";

export default function LeadDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const lead = useSelector((s) =>
    s.leads.list.find((l) => String(l.id) === String(id))
  );

  useEffect(() => {
    if (!lead) dispatch(fetchLeads());
  }, [lead, dispatch]);

  if (!lead) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{lead.name}</h2>
      <p className="text-gray-600">{lead.company}</p>

      <div className="mt-4">
        <h3 className="text-xl mb-2">Lead Information</h3>
        <div>Status: {lead.status}</div>
        <div>Email: {lead.email}</div>
        <div>Phone: {lead.phone}</div>
      </div>
    </div>
  );
}
