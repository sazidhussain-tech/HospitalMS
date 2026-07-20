import API from "../services/api";
import { useState } from "react";

function AddPrescription() {

    const [appointmentId, setAppointmentId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [medicine, setMedicine] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

const response = await fetch(
    `${API}/prescriptions`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            appointment_id: Number(appointmentId),
            doctor_id: Number(doctorId),
            patient_id: Number(patientId),
            medicine,
            description
        })
    }
);
        const data = await response.json();

        alert(data.message || "Prescription Added Successfully");
    };

    return (
        <div>

            <h2>💊 Add Prescription</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Appointment ID"
                    value={appointmentId}
                    onChange={(e) => setAppointmentId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Doctor ID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Medicine"
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Add Prescription
                </button>

            </form>

        </div>
    );
}

export default AddPrescription;
