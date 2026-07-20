import API from "../services/api";
import { useEffect, useState } from "react";

function Patients() {

    const [patients, setPatients] = useState([]);
    const [editPatient, setEditPatient] = useState(null);
    const [search, setSearch] = useState("");
    const getPatients = async () => {
        const response = await fetch(
            `${API}/patients`
        );

        const data = await response.json();

if (Array.isArray(data)) {
    setPatients(data);
} else {
    console.log(data);
    setPatients([]);
}
    };


    useEffect(() => {
        getPatients();
    }, []);
const deletePatient = async (id) => {

    const response = await fetch(
        `${API}/patients/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    getPatients();
};
const updatePatient = async () => {

    const response = await fetch(
        `${API}/patients/${editPatient.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editPatient)
        }
    );

    const data = await response.json();

    alert(data.message);

    setEditPatient(null);

    getPatients();
};
    return (
        <div>

            <h1>🧑 Patients</h1>
	    <input
    type="text"
    placeholder="🔍 Search by Phone"
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
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Blood Group</th>
                        <th>Action</th>
                    </tr>
                </thead>


                <tbody>

                {Array.isArray(patients) &&
patients
.filter((patient) =>
    patient.phone
        .toString()
        .includes(search)
)
.map((patient) => (

                    <tr key={patient.id}>

                        <td>{patient.id}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.phone}</td>
                        <td>{patient.address}</td>
                        <td>{patient.blood_group}</td>
             		<td>
    <button
	className="edit-btn"
        onClick={() => setEditPatient(patient)}
    >
        Edit
    </button>

    <button
	className="delete-btn"
        onClick={() => deletePatient(patient.id)}
    >
        Delete
    </button>
</td>

                    </tr>

                ))}

                </tbody>

            </table>
{editPatient && (
    <div>

        <h2>Edit Patient</h2>

        <input
            value={editPatient.age}
            onChange={(e) =>
                setEditPatient({
                    ...editPatient,
                    age: e.target.value
                })
            }
        />

        <input
            value={editPatient.gender}
            onChange={(e) =>
                setEditPatient({
                    ...editPatient,
                    gender: e.target.value
                })
            }
        />

        <input
            value={editPatient.phone}
            onChange={(e) =>
                setEditPatient({
                    ...editPatient,
                    phone: e.target.value
                })
            }
        />

        <input
            value={editPatient.address}
            onChange={(e) =>
                setEditPatient({
                    ...editPatient,
                    address: e.target.value
                })
            }
        />

        <input
            value={editPatient.blood_group}
            onChange={(e) =>
                setEditPatient({
                    ...editPatient,
                    blood_group: e.target.value
                })
            }
        />

        <button onClick={updatePatient}>
            Update Patient
        </button>

    </div>
)}

        </div>
    );
}

export default Patients;
