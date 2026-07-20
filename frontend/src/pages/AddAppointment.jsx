import API from "../services/api";
import { useState } from "react";

function AddAppointment() {

    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
    `${API}/appointments`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            patient_id: Number(patientId),
            doctor_id: Number(doctorId),
            appointment_date: appointmentDate,
            appointment_time: appointmentTime
        })
    }
);

        const data = await response.json();

        alert(data.message || "Appointment Booked");
    };

    return (
        <div>

            <h2>Book Appointment</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Doctor ID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                />

                <br /><br />

                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                />

                <br /><br />

                <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Book Appointment
                </button>

            </form>

        </div>
    );
}

export default AddAppointment;
