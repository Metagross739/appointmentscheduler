"use client";
import { useEffect, useState } from "react";
import { dummyPatients, Patient } from "../lib/service";

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) {
      setPatients(JSON.parse(stored));
    } else {
      localStorage.setItem("patients", JSON.stringify(dummyPatients));
      setPatients(dummyPatients);
    }
  }, []);

  const paginatedPatients = patients.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalPages = Math.ceil(patients.length / perPage);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Patients
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPatients.map((patient, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4">
            <p>
              <strong>Name:</strong> {patient.name}
            </p>
            <p>
              <strong>Mobile:</strong> {patient.mobile}
            </p>
            <p>
              <strong>WhatsApp:</strong> {patient.WhatsApp}
            </p>
            <p>
              <strong>Email:</strong> {patient.email}
            </p>
            <p>
              <strong>Address:</strong> {patient.address}
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
    </div>
  );
};

export default PatientsPage;
