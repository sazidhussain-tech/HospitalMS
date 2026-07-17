import { useEffect, useState } from "react";

function Prescriptions() {

    const [prescriptions, setPrescriptions] = useState([]);

const [editPrescription, setEditPrescription] = useState(null);

const [search, setSearch] = useState("");

    const getPrescriptions = async () => {

        const response = await fetch(
            "http://localhost:3000/api/prescriptions"
        );

        const data = await response.json();

if (Array.isArray(data)) {
    setPrescriptions(data);
} else {
    console.log(data);
    setPrescriptions([]);
}
    };

    useEffect(() => {
        getPrescriptions();
    }, []);

const deletePrescription = async (id) => {

    const response = await fetch(
        `http://localhost:3000/api/prescriptions/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    getPrescriptions();
};

const updatePrescription = async () => {

    const response = await fetch(
        `http://localhost:3000/api/prescriptions/${editPrescription.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editPrescription)
        }
    );

    const data = await response.json();

    alert(data.message);

    setEditPrescription(null);

    getPrescriptions();
};

    return (
        <div>

            <h2>💊 Prescriptions</h2>
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
                        <th>Appointment ID</th>
                        <th>Doctor ID</th>
                        <th>Patient ID</th>
                        <th>Medicine</th>
                        <th>Description</th>
			<th>Action</th>  
                  </tr>
                </thead>

                <tbody>

                    {Array.isArray(prescriptions) &&
prescriptions
.filter((prescription) =>
    prescription.patient_id
        .toString()
        .includes(search)
)
.map((prescription) => (

                        <tr key={prescription.id}>

                            <td>{prescription.id}</td>
                            <td>{prescription.appointment_id}</td>
                            <td>{prescription.doctor_id}</td>
                            <td>{prescription.patient_id}</td>
                            <td>{prescription.medicine}</td>
                            <td>{prescription.description}</td>
			    <td>

    <button
	className="edit-btn"
        onClick={() => setEditPrescription(prescription)}
    >
        Edit
    </button>

    <button
	className="delete-btn"
        onClick={() => deletePrescription(prescription.id)}
    >
        Delete
    </button>

</td>
                        </tr>

                    ))}

                </tbody>

            </table>

{editPrescription && (
    <div>

        <h2>Edit Prescription</h2>

        <input
            value={editPrescription.appointment_id}
            onChange={(e) =>
                setEditPrescription({
                    ...editPrescription,
                    appointment_id: e.target.value
                })
            }
        />

        <input
            value={editPrescription.doctor_id}
            onChange={(e) =>
                setEditPrescription({
                    ...editPrescription,
                    doctor_id: e.target.value
                })
            }
        />

        <input
            value={editPrescription.patient_id}
            onChange={(e) =>
                setEditPrescription({
                    ...editPrescription,
                    patient_id: e.target.value
                })
            }
        />

        <input
            value={editPrescription.medicine}
            onChange={(e) =>
                setEditPrescription({
                    ...editPrescription,
                    medicine: e.target.value
                })
            }
        />

        <input
            value={editPrescription.description}
            onChange={(e) =>
                setEditPrescription({
                    ...editPrescription,
                    description: e.target.value
                })
            }
        />

        <button onClick={updatePrescription}>
            Update Prescription
        </button>

    </div>
)}

        </div>
    );
}

export default Prescriptions;
