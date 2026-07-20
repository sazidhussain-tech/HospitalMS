import API from "../services/api";
import { useEffect, useState } from "react";
import API from "../services/api";
function Doctors() {

    const [doctors, setDoctors] = useState([]);
const [editDoctor, setEditDoctor] = useState(null);
const [search, setSearch] = useState("");
    const getDoctors = async () => {
        const response = await fetch(
            `${API}/doctors`,
            {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token")
                }
            }
        );

        const data = await response.json();

if (Array.isArray(data)) {
    setDoctors(data);
} else {
    console.log(data);
    setDoctors([]);
}
    };


    useEffect(() => {
        getDoctors();
    }, []);


    const deleteDoctor = async (id) => {

        const response = await fetch(
    `${API}/doctors/${id}`,
    {
        method: "DELETE",
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    }
);

        const data = await response.json();

        alert(data.message);

        getDoctors();
    };

const updateDoctor = async () => {

    const response = await fetch(
    `${API}/doctors/${editDoctor.id}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(editDoctor)
    }
);

    const data = await response.json();

    alert(data.message);

    setEditDoctor(null);
    getDoctors();
};
    return (
        <div>

            <h1>👨‍⚕️ Doctors</h1>
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
                        <th>Specialization</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>


                <tbody>

                {Array.isArray(doctors) &&
doctors
.filter((doctor) =>
    doctor.phone
        .toString()
        .includes(search)
)
.map((doctor) => (

                    <tr key={doctor.id}>

                        <td>{doctor.id}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.address}</td>

                        <td>
			    <button
			      className="edit-btn"
      			      onClick={() => setEditDoctor(doctor)}
    			    >
     			      Edit
    			    </button>
                            <button
			      className="delete-btn"
                              onClick={() => deleteDoctor(doctor.id)}
                            >
                              Delete
                            </button>
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>
		            {editDoctor && (
                <div>

                    <h2>Edit Doctor</h2>

                    <input
                        value={editDoctor.specialization}
                        onChange={(e) =>
                            setEditDoctor({
                                ...editDoctor,
                                specialization: e.target.value
                            })
                        }
                    />

                    <input
                        value={editDoctor.phone}
                        onChange={(e) =>
                            setEditDoctor({
                                ...editDoctor,
                                phone: e.target.value
                            })
                        }
                    />

                    <input
                        value={editDoctor.address}
                        onChange={(e) =>
                            setEditDoctor({
                                ...editDoctor,
                                address: e.target.value
                            })
                        }
                    />

                    <button onClick={updateDoctor}>
                        Update Doctor
                    </button>

                </div>
            )}

        </div>
    );
}

export default Doctors;
