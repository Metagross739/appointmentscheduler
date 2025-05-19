"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  addNewAppointment,
  addNewPatient,
  dummyPatients,
  Patient,
} from "../lib/service";

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Lee"];
const timeSlots = {
  Morning: ["08:00 AM", "08:30 AM", "09:00 AM"],
  Afternoon: ["12:00 PM", "12:30 PM", "01:00 PM"],
  Evening: ["04:00 PM", "04:30 PM", "05:00 PM"],
  Night: ["07:00 PM", "07:30 PM", "08:00 PM"],
};

export default function AddSessionPage() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState("in-person");
  const [showSearch, setShowSearch] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientAdded, setPatientAdded] = useState<Patient | null>(null);
  const [sameAsMobile, setSameAsMobile] = useState(false);

  const [formData, setFormData] = useState<Patient>({
    name: "",
    mobile: "",
    WhatsApp: "", // ✅ Capital 'W' and 'A'
    email: "",
    address: "",
  });

  const router = useRouter();

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "mobile" && sameAsMobile ? { Whatsapp: value } : {}),
    }));
  };

  const handleAddPatient = () => {
    setPatientAdded(formData);
    dummyPatients.push(formData);
    addNewPatient(formData);
    toast.success("Patient added!");
    setShowAddForm(false);
  };

  const foundPatients = dummyPatients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchedule = () => {
    if (!selectedDoctor || !selectedTime || !patientAdded) {
      toast("Please select doctor, time slot, and patient");
      return;
    }
    addNewAppointment({
      doctor: selectedDoctor,
      patient: patientAdded.name,
      time: selectedTime,
      sessionType: sessionType,
    });
    router.push(
      `/confirmation?doctor=${encodeURIComponent(
        selectedDoctor
      )}&patient=${encodeURIComponent(
        patientAdded.name
      )}&time=${encodeURIComponent(
        selectedTime
      )}&sessionType=${encodeURIComponent(sessionType)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-6 overflow-y-auto max-h-[95vh]">
        <h1 className="text-2xl font-bold text-gray-800">Add Session</h1>

        {/* Doctor selection */}
        <div className="overflow-hidden max-w-full">
          <label className="block font-medium mb-1">Select Doctor</label>
          <select
            className="md:w-full border border-amber-500 shadow-2xs rounded-2xl px-3 py-2 text-sm sm:text-base truncate"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option className="border border-amber-500" value="">
              Select a Doctor
            </option>
            {doctors.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>

        {/* Time slots */}
        <div>
          <label className="block font-medium mb-1">Select Time Slot</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(timeSlots).map(([period, slots]) => (
              <div key={period}>
                <h3 className="font-semibold mb-2">{period}</h3>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3 py-1 rounded-xl border-[0.5px] ${
                        selectedTime === slot
                          ? "bg-purple-400 border-purple-400 text-white"
                          : "bg-white border-amber-500"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Options */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => {
              setShowSearch(true);
              setShowAddForm(false);
            }}
            className="bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300 hover:bg-gray-400 px-4 py-2 rounded-xl"
          >
            Find Patient
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddForm(true);
              setShowSearch(false);
            }}
            className="bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300 hover:bg-gray-400 px-4 py-2 rounded-xl"
          >
            Add Patient
          </button>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="mt-4 space-y-2">
            <input
              placeholder="Search Patient..."
              className="w-full border border-amber-500 px-3 py-2 rounded-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {foundPatients.length > 0 ? (
              foundPatients.map((p, i) => (
                <div
                  key={i}
                  className="px-3 py-2 border rounded-2xl border-gray-100 bg-white hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPatientAdded(p);
                    setShowSearch(false);
                  }}
                >
                  {p.name || "Unnamed"}
                </div>
              ))
            ) : (
              <div>
                <p className="text-sm">No patient found.</p>
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setShowSearch(false);
                  }}
                  className="mt-2 text-blue-600 underline text-sm"
                >
                  Add New Patient
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add Patient Form */}
        {showAddForm && (
          <div className="space-y-3 border border-gray-300 shadow p-4 rounded bg-transparent">
            <input
              name="name"
              placeholder="Name"
              onChange={handleFormChange}
              className="w-full border border-amber-400 px-3 py-2 rounded-xl"
            />
            <input
              name="mobile"
              placeholder="Mobile"
              onChange={(e) => {
                handleFormChange(e);
                if (sameAsMobile) {
                  setFormData((prev) => ({
                    ...prev,
                    Whatsapp: e.target.value,
                  }));
                }
              }}
              className="w-full border border-amber-400 px-3 py-2 rounded-xl"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-medium">WhatsApp Number</label>
                <label className="text-sm flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-amber-500"
                    checked={sameAsMobile}
                    onChange={(e) => {
                      setSameAsMobile(e.target.checked);
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          Whatsapp: prev.mobile,
                        }));
                      }
                    }}
                  />
                  Same as Mobile
                </label>
              </div>
              <input
                name="Whatsapp"
                placeholder="WhatsApp"
                value={sameAsMobile ? formData.mobile : formData.WhatsApp}
                onChange={handleFormChange}
                disabled={sameAsMobile}
                className="w-full border border-amber-400 px-3 py-2 rounded-xl"
              />
            </div>
            <input
              name="email"
              placeholder="Email"
              onChange={handleFormChange}
              className="w-full border border-amber-400 px-3 py-2 rounded-xl"
            />
            <textarea
              name="address"
              placeholder="Address"
              onChange={handleFormChange}
              className="w-full border border-amber-400 px-3 py-2 rounded-xl"
            />
            <button
              type="button"
              onClick={handleAddPatient}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Patient
            </button>
          </div>
        )}

        {/* Selected Patient */}
        {patientAdded && (
          <div className="p-3 bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300 rounded">
            <p className="font-semibold">Selected Patient:</p>
            <p>{patientAdded.name}</p>
          </div>
        )}

        {/* Session Type */}
        <div>
          <label className="block font-medium mb-1">Session Type</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sessionType"
                value="in-person"
                checked={sessionType === "in-person"}
                onChange={(e) => setSessionType(e.target.value)}
              />
              In-Person
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sessionType"
                value="online"
                checked={sessionType === "online"}
                onChange={(e) => setSessionType(e.target.value)}
              />
              Online
            </label>
          </div>
        </div>

        <button
          onClick={handleSchedule}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Schedule Session
        </button>
      </div>
    </div>
  );
}
