import API from "../services/api";
import { useEffect, useState } from "react";

function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const [editAppointment, setEditAppointment] = useState(null);
    const [search, setSearch] = useState("");
    const getAppointments = async () => {

        const response = await fetch(
            `${API}/appointments`
        );

        const data = await response.json();

if (Array.isArray(data)) {
    setAppointments(data);
} else {
    console.log(data);
    setAppointments([]);
}
    };

    useEffect(() => {
        getAppointments();
    }, []);

const deleteAppointment = async (id) => {


    console.log("Deleting ID:", id);

    const response = await fetch(
    `${API}/appointments/${id}`,
    {
        method: "DELETE"
    }
);

    const data = await response.json();

    console.log("DELETE RESPONSE:", data);

    alert(JSON.stringify(data));

    getAppointments();
};

const updateAppointment = async () => {

    const response = await fetch(
    `${API}/appointments/${editAppointment.id}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editAppointment)
    }
);

    const data = await response.json();

    alert(data.message);

    setEditAppointment(null);

    getAppointments();
};
    return (
        <div>

            <h1>📅 Appointments</h1>
	    <input
    type="text"
    placeholder="🔍 Search by Patient ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
        marginBottom: "15px",
        padding: "8px",
        width: "250px"
    }}
/>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Doctor ID</th>
                        <th>Date</th>
                        <th>Time</th>
			<th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {Array.isArray(appointments) &&
appointments
.filter((appointment) =>
    appointment.patient_id
        .toString()
        .includes(search)
)
.map((appointment) => (

                        <tr key={appointment.id}>

                            <td>{appointment.id}</td>
                            <td>{appointment.patient_id}</td>
                            <td>{appointment.doctor_id}</td>
                            <td>{appointment.appointment_date}</td>
                            <td>{appointment.appointment_time}</td>
			    <td>

    <button
	className="edit-btn"
        onClick={() => setEditAppointment(appointment)}
    >
        Edit
    </button>

    <button
	className="delete-btn"
        onClick={() => deleteAppointment(appointment.id)}
    >
        Delete
    </button>

</td>
                        </tr>

                    ))}

                </tbody>

            </table>
{editAppointment && (
    <div>

        <h2>Edit Appointment</h2>

        <input
            value={editAppointment.patient_id}
            onChange={(e) =>
                setEditAppointment({
                    ...editAppointment,
                    patient_id: e.target.value
                })
            }
        />

        <input
            value={editAppointment.doctor_id}
            onChange={(e) =>
                setEditAppointment({
                    ...editAppointment,
                    doctor_id: e.target.value
                })
            }
        />

        <input
            type="date"
            value={editAppointment.appointment_date}
            onChange={(e) =>
                setEditAppointment({
                    ...editAppointment,
                    appointment_date: e.target.value
                })
            }
        />

        <input
            type="time"
            value={editAppointment.appointment_time}
            onChange={(e) =>
                setEditAppointment({
                    ...editAppointment,
                    appointment_time: e.target.value
                })
            }
        />

        <button onClick={updateAppointment}>
            Update Appointment
        </button>

    </div>
)}		

        </div>
    );
}

export default Appointments;
