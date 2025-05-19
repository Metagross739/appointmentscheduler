"use client";
import { useEffect, useState } from "react";
import { appointmentsArray } from "../lib/service";

type Appointment = {
  doctor: string;
  patient: string;
  time: string;
  sessionType: string;
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const perPage = 10;

  useEffect(() => {
    const stored = localStorage.getItem("appointments");

    if (stored) {
      setAppointments(JSON.parse(stored) as Appointment[]);
    } else {
      localStorage.setItem("appointments", JSON.stringify(appointmentsArray));
      setAppointments(appointmentsArray);
    }

    setLoading(false);
  }, []);

  const paginatedAppointments = appointments.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(appointments.length / perPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 text-white">
        <p className="text-lg font-semibold">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-white">No appointments available.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAppointments.map((patient, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <p>
                  <strong>Doctor:</strong> {patient.doctor || "N/A"}
                </p>
                <p>
                  <strong>Patient:</strong> {patient.patient || "N/A"}
                </p>
                <p>
                  <strong>Time:</strong> {patient.time || "N/A"}
                </p>
                <p>
                  <strong>Session Type:</strong> {patient.sessionType || "N/A"}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  i + 1 === page ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsPage;
