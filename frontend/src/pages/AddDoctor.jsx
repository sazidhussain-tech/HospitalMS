import API from "../services/api";
import { useState } from "react";
import API from "../services/api";
function AddDoctor() {
    const [userId, setUserId] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API}/doctors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                user_id: Number(userId),
                specialization,
                phone,
                address
            })
        });

        const data = await response.json();
        alert(data.message || "Doctor Added");
    };

    return (
        <div>
            <h2>Add Doctor</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <br /><br />

                <input
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
                <br /><br />

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <br /><br />

                <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <br /><br />

                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
}

export default AddDoctor;
