"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format } from "date-fns";
import { dummyPatients } from "./lib/service";
import { Menu } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleAddSession = () => {
    if (!selectedDate) return toast.error("Please select a date");
    const formatted = format(selectedDate, "yyyy-MM-dd");
    router.push(`/add-session?date=${formatted}`);
  };

  const handleViewPatients = () => {
    router.push(`/patients`);
  };

  const handleViewAppointments = () => {
    router.push(`/appointments`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    (function () {
      const existing = localStorage.getItem("patients");
      if (!existing) {
        localStorage.setItem("patients", JSON.stringify(dummyPatients));
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 relative overflow-hidden">
      {/* Navbar */}
      <nav className="bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-400 text-white shadow p-4 flex items-center justify-between">
        <button
          className="md:hidden text-white"
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>
        <h1 className="text-xl font-bold">Appointment Scheduler</h1>
        <div className="text-sm hidden md:block">Logged in as Admin</div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 md:h-screen h-full w-64 z-40 bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-400 text-white shadow-md transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0 overflow-y-auto`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2 text-sm">
              <li
                className="hover:text-yellow-100 cursor-pointer"
                onClick={handleViewPatients}
              >
                Patients
              </li>
              <li
                className="hover:text-yellow-100 cursor-pointer"
                onClick={handleViewAppointments}
              >
                Appointments
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
              Select a Date
            </h2>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar value={selectedDate} onChange={setSelectedDate} />
            </LocalizationProvider>

            <button
              onClick={handleAddSession}
              className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Session
            </button>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
