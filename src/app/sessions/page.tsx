"use client";
import { useEffect, useState } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("sessions");
    if (stored) {
      setSessions(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Scheduled Sessions</h1>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions scheduled yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((s, index) => (
            <li key={index} className="border p-4 rounded bg-white shadow">
              <p>
                <strong>Name:</strong> {s.name}
              </p>
              <p>
                <strong>Mobile:</strong> {s.mobile}
              </p>
              <p>
                <strong>Date:</strong> {s.date}
              </p>
              <p>
                <strong>Time:</strong> {s.time}
              </p>
              <p>
                <strong>Session:</strong> {s.sessionType}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
