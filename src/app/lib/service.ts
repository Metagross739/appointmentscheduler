// service.js or service.ts

export const dummyPatients = [
  {
    name: "Alice",
    mobile: "+9194553465222",
    WhatsApp: "9244129633",
    email: "alice@gmail.com",
    address: "central Park",
  },
  {
    name: "Louis Strauss",
    mobile: "8143514167",
    WhatsApp: "8143514167",
    email: "loisstrauss@gmail.com",
    address: "Suits LA",
  },
];

export const appointmentsArray = [
  {
    doctor: "Dr Smith",
    patient: "Jhon Lee",
    time: "2:00pm",
    sessionType: "Online",
  },
  {
    doctor: "Dr Lee",
    patient: "Rock Lee",
    time: "10:30AM",
    sessionType: "In Person",
  },
  {
    doctor: "Dr Jhon",
    patient: "Louis Strauss",
    time: "3:00PM",
    sessionType: "Online",
  },
];

export const addNewPatient = (newPatient) => {
  const existing = localStorage.getItem("patients");
  const patients = existing ? JSON.parse(existing) : [];

  patients.push(newPatient);
  localStorage.setItem("patients", JSON.stringify(patients));
};

export const addNewAppointment = (newAppointment) => {
  const existing = localStorage.getItem("appointments");
  const appointments = existing ? JSON.parse(existing) : [];

  appointments.push(newAppointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));
};
