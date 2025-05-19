"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const doctor = searchParams.get("doctor") || "";
  const patient = searchParams.get("patient") || "";
  const time = searchParams.get("time") || "";
  const sessionType = searchParams.get("sessionType") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 p-4">
      <div className="p-6 max-w-md w-full bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Session Confirmation
        </h1>

        <div className="space-y-3">
          <p>
            <strong>Patient Name:</strong> {patient}
          </p>
          <p>
            <strong>Doctor Name:</strong> {doctor}
          </p>
          <p>
            <strong>Time Slot:</strong> {time}
          </p>
          <p>
            <strong>Session Type:</strong>{" "}
            {sessionType === "in-person" ? "In-Person" : "Online"}
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Back to Calendar
        </button>
      </div>
    </div>
  );
}
